module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure mongoose is connected

    /* the schema - defines the "shape" of the documents:
     *   gets compiled into one or more models */
    , PlayerSchema = new Schema({
    // instance properties
      // the socket by which we can communicate with this player
      socket: Schema.Types.Mixed
      // this player's username
    , username: String
      // the number of chips this player has at the current table
    , chips: Number
      // whether this player has paid a big blind at this table yet
    , blind_paid: { type: Boolean, default: false }
    });

  var static_properties = {
  // static properties (attached below) - Model.property_name
    // message-to-handler map, { message_name: instance_method_name }
    messages: {
    }
  };

  // static methods - Model.method()
  PlayerSchema.statics.createPlayer = function(spec) {
    /* our "constructor" function. Usage: Player.createPlayer({prop: 'val'})
       (see Schema definition for list of properties)*/
    console.log('Player.createPlayer called!');
    var player = new Player(spec);
    return player;
  };

  // instance methods - document.method()
  PlayerSchema.methods.prompt = function(actions, timeout, cb) {
    var self = this
      , act_timeout;
    console.log('prompting', self.username, 'for next action', actions, timeout);
    self.socket.emit('act_prompt', actions, timeout);
    self.socket.once('act', function(action, num_chips) {
      console.log(self.username, 'responds with', action, num_chips);
      clearTimeout(act_timeout);
      cb(action, num_chips);
    });
    act_timeout = setTimeout(function() {
      console.log(self.username, 'fails to respond within', timeout, 'ms');
      self.removeAllListeners('act');
      cb();
    }, timeout);
  };

  PlayerSchema.methods.toObject = function() {
    return { username: this.username, chips: this.chips };
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var Player = mongoose.model('Player', PlayerSchema);

  //static properties (defined above)
  _.extend(Player, static_properties);

  return Player;
})();