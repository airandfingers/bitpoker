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
    next: Number
  });

  /* Create static method on schema, incrementing the guest counter */
  GuestSchema.statics.increment = function (callback) {
    return this.collection.findAndModify({}, [], { $inc: { next: 1 } }, {}, callback);
  };

  /* Create model */
	var Guest_counter = mongoose.model('guest_counter', GuestSchema);

  /* create a single counter if none currently exists */
  Guest_counter.find(function(err, guest_counters) {
    if (guest_counters.length === 0) {
      console.log('Creating guest counter with next=0');
      new Guest_counter({ next: 0 }).save();
    }
  });

  return Guest_counter;

})();