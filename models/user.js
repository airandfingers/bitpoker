module.exports = (function() {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , crypto = require('crypto') // encryption utility library
    , async = require('async') // flow control utility library
    , request = require('request') // HTTP/HTTPS request library
    , _ = require('underscore') // list utility library
    
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
  , maobucks         : { type: Number, default: 10, min: 0 }
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
    console.log('creating user with', spec);
    var user = new User(spec);
    user.generateDepositAddress(function() {
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

  // lookup and return current maobucks value
  UserSchema.methods.maobucks_inquire = function(cb) {
    User.findOne({ _id: this._id }, function(err, user) {
      if (err) {
        cb(err);
      }
      else {
        console.log(user.username + " has " + (user && user.maobucks) + " in maobucks on " + Date());
        cb(null, user && user.maobucks)
      }
    });
  };

  // lookup and return current satoshi value
  UserSchema.methods.satoshi_inquire = function(cb) {
    User.findOne({ _id: this._id }, function(err, user) {
      if (err) {
        cb(err);
      }
      else {
        console.log(user.username + " has " + (user && user.satoshi) + " in satoshi on " + Date());
        cb(null, user && user.satoshi)
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
                '&callback=https://bitcoin-poker-7793.onmodulus.net/bitcoin_deposit/' + user.username;
      request({
        url: url
      }, function(err, response, body) {
        if (err) {
          console.error('Error while creating deposit address:', err);
        }
        else if (response.statusCode !== 200 && response.statusCode !== 201) {
          console.error('Unsuccessful response code while creating deposit address:', response.statusCode);
        }
        else {
          var body = JSON.parse(response.body);
          user.deposit_address = body.input_address;
          console.log('user.deposit_address is ' + user.deposit_address);
        }
        cb();
      });
    };  
  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var User = mongoose.model('User', UserSchema);

  return User;
})();