module.exports = (function() {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

      , crypto = require('crypto') // encryption utility library
    , async = require('async') // flow control utility library
    , request = require('request') // HTTP/HTTPS request library
    , _ = require('underscore') // list utility library

    , GuestCounter = require('./guest_counter')
    
    , db = require('./db'); // make sure db is connected

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var UserSchema = new Schema({
  // instance properties - document.field_name
    //the user's username
    username         : { type: String, unique: true }
    //the user's password, hashed with SHA-1
  , password         : String
    //the user's email address
  , email            : { type: String, trim: true }
    //the code used to confirm this user's email
  , confirmation_code: String
    //whether the user has confirmed his/r email address
  , email_confirmed  : { type: Boolean, default: false }
  , funbucks         : { type: Number, default: 100, min: 0 }
  , satoshi          : { type: Number, default: 0, min: 0 }
  , recovery_code    : { type: String }
  , registration_date: { type: Date, default: Date.now }
  , deposit_address  : { type: String }
  });

  // static methods - Model.method()
  UserSchema.statics.createUser = function(spec, cb) {
    console.log('createUser called for', spec);
    var pt_password = spec.pt_password
      , shasum = crypto.createHash('sha1');
    if (spec.username.substring(0, 5) !== 'guest') { 
      
      if (_.isString(pt_password)) {
        shasum.update(pt_password);
        shasum = shasum.digest('hex');
        spec.password = shasum;
        delete spec.pt_password;
      }
      else {
        console.error('User.createUser called on user without pt_password!');
        cb(null);
      }
    }
    console.log('creating user with', spec);
    var user = new User(spec);
    user.generateDepositAddress(function() {
      cb(user);
    });
  };

  UserSchema.statics.createGuestUser = function(cb) {
    GuestCounter.increment(function (err, guest_num) {
      if (err) {
        console.error('Error during GuestCounter.increment:', err);
        return cb(null);
      }
      var username = 'guest' + guest_num
        , user = new User({ username: username });
      cb(user);
    });
  };

  UserSchema.statics.authenticate = function(username, password, cb) {
    var model = this
      , shasum = crypto.createHash('sha1');
    shasum.update(password);
    shasum = shasum.digest('hex');
    // look for a matching username/password combination
    model.findOne({
      username: username,
      password: shasum
    }, cb);
  };

  UserSchema.statics.generateConfirmationCode = function(cb) {
    crypto.randomBytes(16, function(err, buf) {
      if (err) {
        cb(err);
      }
      else {
        var confirmation_code = buf.toString('hex');
        cb(null, confirmation_code);
      }
    });
  };
  
  UserSchema.statics.generatePasswordRecoveryCode = function(cb) {
    crypto.randomBytes(16, function(err, buf) {
      if (err) {
        cb(err);
      }
      else {
        var recovery_code = buf.toString('hex');
        cb(null, recovery_code);
      }
    });
  };

  // instance methods - document.method()
  // example method
  UserSchema.methods.sayName = function() {
    console.log(this.username);
  };

  UserSchema.methods.convertFromGuest = function(username, pt_password, cb) {
    var self = this
      , error = null
      , shasum = crypto.createHash('sha1')
      , spec = { username: username };
    console.log('convertFromGuest called for', self.username);
    
    if (self.username.substring(0, 5) !== 'guest') {
      error = 'User.convertFromGuest called for non-guest user ' + self.username;
      console.error(error);
      return cb(error);
    }

    if (! _.isString(username)) {
      error = 'User.convertFromGuest called without username!';
      console.error(error);
      return cb(error);
    }

    if (! _.isString(pt_password)) {
      error = 'User.convertFromGuest called without pt_password!';
      console.error(error);
      return cb(error);
    }

    // encrypt pt_password and save it as pt_password
    shasum.update(pt_password);
    shasum = shasum.digest('hex');
    spec.password = shasum;
    
    console.log('updating user with', spec);
    self.update(spec, function(err, result) {
      console.log('update callback called with', err, result);
      if (err) {
        error = 'Error in User.convertFromGuest: ' + err.message;
        console.error(error);
        return cb(error);
      }
      self.generateDepositAddress(function(generate_err) {
        cb(generate_err, self);
      });
    });
  };

  // lookup and return current currency value of the given type
  UserSchema.methods.checkBalance = function(type, cb) {
    User.findOne({ _id: this._id }, function(err, user) {
      if (err) {
        cb(err);
        return;
      }
      else {
        console.log(user.username + ' has ' + (user && user[type]) + ' in ' + type + ' on ' + Date());
        cb(null, user && user[type])
      }
    });
  };

  // lookup and return current, complete user document
  UserSchema.methods.fetch = function(cb) {
    User.findOne({ _id: this._id }, function(err, user) {
      //console.log('findOne returns', err, user);
      cb(err, user);
    });
  };

  UserSchema.methods.generateDepositAddress = function(cb) {
      var user = this
      // generate deposit public address for this user
        , url = 'https://blockchain.info/api/receive?method=create' +
                '&address=1NpMFVFNjutgY2VXGfn97WcBa1JafSVHF' +
                '&shared=false' +
                '&callback=https://bitcoin-poker-7793.onmodulus.net/bitcoin_deposit/' + user.username
        , error = null;
      request({
        url: url
      }, function(err, response, body) {
        if (err) {
          error = 'Error while creating deposit address: ' + err.message;
          console.error(error);
        }
        else if (response &&
                 response.statusCode !== 200 &&
                 response.statusCode !== 201) {
          error = 'Unsuccessful response code while creating deposit address: ' + response.statusCode
          console.error(error);
        }
        else {
          var body = JSON.parse(response.body);
          user.deposit_address = body.input_address;
          console.log('user.deposit_address is ' + user.deposit_address);
        }
        cb(error);
      });
    };  

  UserSchema.statics.getLeaders = function(currency, cb) {
    console.log ('getLeaders function called');
    User.find()
      .limit(25)
      .sort('-' + currency)
      .select('username funbucks satoshi')
      .exec(function (err, users) {
        if (err) return cb(err);
        console.log('users are', users);
        cb(err, users);
      });   
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var User = mongoose.model('User', UserSchema);

  return User;
})();