module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    , async = require('async'); // sync/async control flow library

  var static_properties = {
  // static properties (attached below) - Model.property_name
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var HandHistorySchema = new Schema({
  // instance properties - document.field_name
    // unique identifier for the hand
    hand_id             : String
    // the hand history string, compatible with pokerhand.org
  , history_string      : { type: String, default: '' }
    // time at which hands were dealt
  , started_at          : Date
    // serialized player objects at deal-time
  , initial_player_objs : { type: [Schema.Types.Mixed], default: function() { return []; } }
    // names of users who participated in this hand
  , usernames           : { type: [String], default: function() { return []; } }
    // time at which winnings were paid out
  , finished_at         : Date
    // serialized player objects at payout-time
  , final_player_objs   : { type: [Schema.Types.Mixed], default: function() { return []; } }
  });

  // static methods - Model.method()
  HandHistorySchema.statics.createHandHistory = function(spec) {
    /* our "constructor" function. Usage: HandHistory.createHandHistory({prop: 'val'})
       (see Schema definition for list of properties)*/
    //console.log('HandHistory.createHandHistory called!', spec);
    var hand_history = new HandHistory(spec);
    //console.log('created hand history:', hand_history);
    return hand_history;
  };

  // instance methods - document.method()
  HandHistorySchema.methods.update = function(spec) {
    var self = this;
    _.each(spec, function(value, field) {
      self[field] = value;
      if (field === 'initial_player_objs') {
        // also set usernames
        self.usernames = _.pluck(value, 'username');
      }
    });
    console.log('updated hand history:', self);
  };

  HandHistorySchema.methods.updateHistory = function() {
    
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var HandHistory = mongoose.model('hand_history', HandHistorySchema);

  //static properties (defined above)
  _.extend(HandHistory, static_properties);

  return HandHistory;
})();