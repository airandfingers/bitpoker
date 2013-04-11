module.exports = (function() {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , crypto = require('crypto') // encryption utility library
    , async = require('async') // flow control utility library
    
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
  , maobucks         : { type: Number, default: 0 }
  , registration_date: { type: Date, default: Date.now }
  });

  // static methods - Model.method()
  UserSchema.statics.authenticate = function(username, password, cb) {
    var model = this
      , shasum = crypto.createHash('sha1');
    shasum.update(password);
    shasum = shasum.digest('hex');
    // look for a matching username/password combination
    model.findOne({
      username: username,
      password: shasum
    }, function(err, result) {
      if (err) cb(error);
      else cb(null, result)
    });
  };

  UserSchema.statics.generateConfirmationCode = function(callback) {
    crypto.randomBytes(16, function(err, buf) {
      if (err) {
        callback(err);
      }
      else {
        var confirmation_code = buf.toString('hex');
        callback(null, confirmation_code);
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
      //console.log('findOne returns', err, user);
      console.log(user.username + " has " + (user && user.maobucks) + " in maobucks on " + Date());
      cb(err, user && user.maobucks);
    });
  };

  // lookup and return current, complete user document
  UserSchema.methods.fetch = function(cb) {
    User.findOne({ _id: this._id }, function(err, user) {
      //console.log('findOne returns', err, user);
      cb(err, user);
    });
  };

  // gets called before a document is saved
  UserSchema.pre('save', function(next) {
    var user = this
    // encrypt the user's password
      , shasum = crypto.createHash('sha1');
    shasum.update(user.password);
    shasum = shasum.digest('hex');
    user.password = shasum;
  });

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var User = mongoose.model('User', UserSchema);

  return User;
})();