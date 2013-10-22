module.exports = (function() {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , crypto = require('crypto') // encryption utility library
    , async = require('async') // flow control utility library
    , request = require('request') // HTTP/HTTPS request library
    , _ = require('underscore') // list utility library

    , GuestCounter = require('./guest_counter')
    
    , db = require('./db') // make sure db is connected

    , mailer = require('../mailer'); // used to send emails

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
  , email_confirmed    : { type: Boolean, default: false }
  , funbucks           : { type: Number, default: 100, min: 0 }
  , satoshi            : { type: Number, default: 0, min: 0 }
  , recovery_code      : { type: String }
  , registration_date  : { type: Date, default: Date.now }
  , deposit_address    : { type: String }
  , current_table_names: { type: [String], default: function() { return {}; } }
  // persistent preferences shared across sessions/tables
  , preferences        : { type: Schema.Types.Mixed, default: function() { return {}; } }
  }, { minimize: false }); // set minimize to false to save empty objects

  // static methods - Model.method()
  UserSchema.statics.createUser = function(spec, cb) {
    var username = spec.username
      , pt_password = spec.pt_password
      , error;
    console.log('createUser called for', spec);
    if (_.escape(username) !== username) {
      error = 'The following characters are not allowed in usernames: & < > " \' /';
    }
    else if (User.isGuest(username)) {
      error = 'non-guest usernames may not begin with "guest"!';
    }
    else if (! _.isString(pt_password)) {
      error = 'User.createUser called without pt_password!';
    }
    if (error) {
      console.error(error);
      return cb(error);
    }

    spec.password = User.encryptPassword(pt_password);
    delete spec.pt_password;

    var user = new User(spec);
    console.log('created user with', spec, user);
    user.generateDepositAddress(function() {
      user.save(function(save_err, result) {
        if (save_err) {
          error = 'Error during save: ' + save_err;
          return cb(error);
        }
        if (! _.isEmpty(spec.email)) {
          user.sendConfirmationEmail(spec.email, function(email_err) {
            if (email_err) {
              error = 'Error while sending email: ' + email_err;
              return cb(error);
            }
            cb(null, result);
          })
        }
        else {
          cb(null, result);
        }
      });
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
      console.log('Created guest user:', user);
      cb(user);
    });
  };

  UserSchema.statics.authenticate = function(username, password, cb) {
    var model = this;
    // look for a matching username/password combination
    model.findOne({
      username: username,
      password: User.encryptPassword(password)
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

  UserSchema.statics.isGuest = function(username) {
    return username.substring(0, 5) === 'guest';
  };

  UserSchema.statics.getByIdWithoutPassword = function(id, cb) {
    User.findOne({ _id: id }, { password: false }, cb);
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

  UserSchema.statics.encryptPassword = function(pt_password) {
    var shasum = crypto.createHash('sha1');
    if (_.isString(pt_password)) {
      shasum.update(pt_password);
      shasum = shasum.digest('hex');
    }
    else {
      console.log('User.encryptPassword called without pt_password!');
      shasum = null;
    }
    return shasum;
  };

  // instance methods - document.method()
  UserSchema.methods.sendConfirmationEmail = function(email, cb) {
    var self = this
      , error = null
      , valid = true; //this is a stub to hold the place for a email validator functionality. 
    //if email is valid, save it to MongoDB
    if (valid) {
      //attach e-mail to user
      User.generateConfirmationCode(function(err, confirmation_code) {
        if (err) {
          error = 'Error while generating confirmation code:' + err;
          console.error(error);
          cb(error);
        }
        else {
          self.update({ $set: { email: email, confirmation_code: confirmation_code } },
                      function(err) {
            if (err) {
              error = 'Error when saving email to database:' + err;
              console.error(error);
            }
            else {
              console.log('Email saved to ' + self.username + '\'s account.');
              mailer.sendConfirmationEmail(email, confirmation_code, self.username);
            }
            cb(error);
          });
        }
      });
    }
  };

  UserSchema.methods.convertFromGuest = function(spec, cb) {
    var self = this
      , username = spec.username
      , pt_password = spec.pt_password
      , keys = _.keys(spec)
      , error;
    console.log('convertFromGuest called for', username);

    if (! User.isGuest(self.username)) {
      error = 'User.convertFromGuest called for non-guest user! ' + username;
    }
    else if (! _.isString(username)) {
      error = 'User.convertFromGuest called without username!';
    }
    else if (_.escape(username) !== username) {
      error = 'The following characters are not allowed in usernames: & < > " \' /';
    }
    else if (User.isGuest(username)) {
      error = 'non-guest usernames may not begin with "guest"!';
    }
    else if (! _.isString(pt_password)) {
      error = 'User.convertFromGuest called without pt_password!';
    }
    if (error) {
      console.error(error);
      return cb(error);
    }

    if (! (keys.length === 2 || (keys.length === 3 && _.contains(keys, 'email')))) {
      error = 'User.convertFromGuest called with invalid spec keys:' + keys;
      console.error(error);
      return cb(error);
    }

    // encrypt pt_password and save it as password
    spec.password = User.encryptPassword(pt_password);
    delete spec.pt_password;
    
    console.log('updating user with', spec);
    _.extend(self, spec);
    self.save(function(update_err, result) {
      console.log('update callback called with', update_err, result);
      if (update_err) {
        error = 'Error in User.convertFromGuest: ' + update_err.message;
        console.error(error);
        return cb(error);
      }

      self.generateDepositAddress(function() {
        self.save(function(save_err, result) {
          if (save_err) {
            error = 'Error during save: ' + save_err;
            return cb(error);
          }
          if (_.isString(spec.email)) {
            self.sendConfirmationEmail(spec.email, function(email_err) {
              if (email_err) {
                error = 'Error while sending email: ' + email_err;
                return cb(error);
              }
              cb(null, result);
            })
          }
          else {
            cb(null, result);
          }
        });
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
        console.log('augmented user with deposit_address:' + user.deposit_address);
      }
      cb(error);
    });
  };

  UserSchema.methods.onJoinTable = function(table_name) {
    this.update({ $addToSet: { current_table_names: table_name } }, function(err, result) {
      if (err) {
        var error = 'Error in User.joinTable: ' + err.message;
        console.error(error);
      }
      console.log('onJoinTable(' + table_name + ') update returns', err, result);
    });
  };

  UserSchema.methods.onLeaveTable = function(table_name) {
    this.update({ $pull: { current_table_names: table_name } }, function(err, result) {
      if (err) {
        var error = 'Error in User.leaveTable: ' + err.message;
        console.error(error);
      }
      console.log('onLeaveTable(' + table_name + ') update returns', err, result);
    });
  };

  UserSchema.methods.setPreference = function(name, value, cb) {
    var user = this;
    user.preferences[name] = value;
    user.markModified('preferences');
    user.save(function(save_err) {
      if (save_err) {
        console.error('Error during setPreference.save:', save_err);
      }
      cb(user);
    });
  };

  UserSchema.methods.setPreferences = function(preferences, cb) {
    var user = this;
    _.each(preferences, function(value, name) {
      user.preferences[name] = value;
    });
    user.markModified('preferences');
    user.save(function(save_err) {
      if (save_err) {
        console.error('Error during setPreferences.save:', save_err);
      }
      cb(user);
    });
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var User = mongoose.model('User', UserSchema);

  return User;
})();