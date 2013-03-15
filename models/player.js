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
      // this player's hand, a list of Strings representing cards
    , hand: { type: [String], default: function() { return []; } }
      // the number of chips this player is betting in the current stage
    , current_bet: { type: Number, default: 0 }
    /*// whether this player has paid a big blind at this table yet
    , blind_paid: { type: Boolean, default: false }*/
      // whether this player wants to post blinds automatically (or, in v1, at all)
    , auto_post_blinds: { type: Boolean, default: true }
      // the seat number this player is currently sitting in, if any
    , seat: Number
      // which stages this player has acted in, in the current round
    , has_acted: { type: Schema.Types.Mixed, default: function() { return {}; } }
    });

  var static_properties = {
  // static properties (attached below) - Model.property_name
    // message-to-handler map, { message_name: instance_method_name }
    messages: {
      set_flag: 'setFlag'
    }
  };

  // static methods - Model.method()
  PlayerSchema.statics.createPlayer = function(spec) {
    /* our "constructor" function. Usage: Player.createPlayer({prop: 'val'})
       (see Schema definition for list of properties)*/
    console.log('Player.createPlayer called!');
    var player = new Player(spec);
    player.initialize();
    return player;
  };

  // instance methods - document.method()
  PlayerSchema.methods.initialize = function() {
    // attach handlers for messages as defined in Player.messages
    io.bindMessageHandlers.call(this, this.socket, static_properties.messages);
  };

  PlayerSchema.methods.makeBet = function(amount) {
    if (this.chips < amount) {
      amount = this.chips;
    }
    this.chips -= amount;
    this.current_bet += amount;
    return amount;
  };

  PlayerSchema.methods.giveBet = function() {
    var amount = this.current_bet;
    this.current_bet = 0;
    return amount;
  };

  PlayerSchema.methods.returnBet = function() {
    this.chips += this.current_bet;
    this.current_bet = 0;
  };

  PlayerSchema.methods.win = function(amount) {
    this.chips += amount;
  };

  PlayerSchema.methods.receiveHand = function(first_card, second_card) {
    this.hand.push(first_card);
    this.hand.push(second_card);
  };

  PlayerSchema.methods.returnHand = function() {
    this.hand = [];
  };

  PlayerSchema.methods.prompt = function(actions, timeout, default_action, cb) {
    var self = this
      , act_timeout;
    console.log('prompting', self.username, 'for next action', actions, timeout);
    self.sendMessage('act_prompt', actions, timeout);
    self.socket.once('act', function(action, num_chips) {
      console.log(self.username, 'responds with', action, num_chips);
      clearTimeout(act_timeout);
      cb(action, num_chips);
    });
    act_timeout = setTimeout(function() {
      console.log(self.username, 'fails to respond within', timeout, 'ms');
      self.removeAllListeners('act');
      cb(default_action);
    }, timeout);
  };

  PlayerSchema.methods.actedIn = function(stage) {
    this.has_acted[stage] = true;
  };

  PlayerSchema.methods.hasActedIn = function(stage) {
    return this.has_acted[stage] || false;
  };

  PlayerSchema.methods.resetHasActed = function() {
    this.has_acted = {};
  };

  PlayerSchema.methods.roundOver = function() {
    this.returnBet();
    this.returnHand();
    this.resetHasActed();
  };

  PlayerSchema.methods.sendMessage = function() {
    this.socket.emit.apply(this.socket, arguments);
  };

  PlayerSchema.methods.toObject = function() {
    var self = this
      , keys = ['username', 'seat', 'chips', 'auto_post_blinds', 'current_bet']
      , player_obj = {};
    _.each(keys, function(key) {
      player_obj[key] = self[key];
    });
    return player_obj;
  };

  PlayerSchema.methods.takeSeat = function(seat_num) {
    this.seat = seat_num;
  };

  PlayerSchema.methods.vacateSeat = function() {
    delete this.seat;
  };

  PlayerSchema.methods.setFlag = function(name, value) {
    if (name !== 'auto_post_blinds' || ! _.isBoolean(value)) {
      console.error('setFlag called with', name, value);
      return;
    }
    console.log(this.toObject(), 'setting', name, 'to', value);
    this[name] = value;
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