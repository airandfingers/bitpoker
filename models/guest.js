module.exports = (function() {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , crypto = require('crypto') // encryption utility library
    , async = require('async') // flow control utility library
    , request = require('request') // HTTP/HTTPS request library
    , _ = require('underscore') // list utility library
    
    , db = require('./db'); // make sure db is connected


  /* Create collection */
  var GuestSchema = new Schema({
  	_id: String,
    next: Number
  });

  /* Create static method on schema, exposing findAndModify */
  GuestSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
  };

  /* Create model */
	var guest_counter = mongoose.model('guest_schema', GuestSchema);

  /*Find and modify */
  guest_counter.findAndModify({ _id: 'messagetransaction' }, [], { $inc: { next: 1 } }, {}, function (err) {
    if (err) throw err;
    console.log('updated guest counter to: \n' + guest_counter);
  });

  return guest_counter;

})();