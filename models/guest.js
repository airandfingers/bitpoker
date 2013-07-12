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
	var Guest_counter = mongoose.model('guest_schema', GuestSchema);

  /* create a single counter if none currently exists */
  Guest_counter.find(function(err, Guest_counters) {
    if (Guest_counters.length === 0) {
      console.log('Creating guest counter with next=0');
      Guest_counter.update({ next: 0 }, {upsert : true});
    }
  });

  return Guest_counter;

})();