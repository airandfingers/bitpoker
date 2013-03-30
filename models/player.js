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
      // the flags that describe how this player will act automatically
    , flags: { type: Schema.Types.Mixed, default: function() { return {}; } }
      // the seat number this player is currently sitting in, if any
    , seat: Number
      // which stages this player has acted in, in the current round
    , has_acted: { type: Schema.Types.Mixed, default: function() { return {}; } }
      // the number of chips thie player won this round, if any
    , chips_won: { type: Number, default: 0 }
      // whether this player is sitting out
    , sitting_out: { type: Boolean, default: false }
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
      console.log( this.username + ' cant afford to bet ' + amount);
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
    this.chips_won = amount;
  };

  PlayerSchema.methods.receiveHand = function(first_card, second_card) {
    this.hand.push(first_card);
    this.hand.push(second_card);
  };

  PlayerSchema.methods.prompt = function(actions, timeout, default_action, cb) {
    var self = this
      , act_timeout;
    console.log('prompting', self.username, 'for next action', actions, timeout);
    self.sendMessage('act_prompt', actions, timeout);
    self.socket.once('act', function(action, num_chips) {
      console.log(self.username, 'responds with', action, num_chips);
      self.sitting_out = false;
      clearTimeout(act_timeout);
      cb(action, num_chips);
    });
    act_timeout = setTimeout(function() {
      console.log(self.username, 'fails to respond within', timeout, 'ms');
      //self.setFlag('sit_out_next_hand', true);
      self.socket.removeAllListeners('act');
      cb(default_action);
    }, timeout);
  };

  PlayerSchema.methods.actedIn = function(stage) {
    this.has_acted[stage] = true;
  };

  PlayerSchema.methods.hasActedIn = function(stage) {
    return this.has_acted[stage] || false;
  };

  PlayerSchema.methods.roundOver = function() {
    this.returnBet();
    this.hand = [];
    this.has_acted = {};
    this.chips_won = 0;
  };

  PlayerSchema.methods.sendMessage = function() {
    this.socket.emit.apply(this.socket, arguments);
  };

  PlayerSchema.methods.toObject = function() {
    return this.serialize(['chips_won', 'hand', 'has_acted']);
  }

  PlayerSchema.methods.serialize = function(also_include) {
    var self = this
      , default_include = ['username', 'seat', 'chips', 'current_bet']
      , include = _.union(default_include, also_include || [])
      , player_obj = {};
    //console.log('player.serialize called, include is', include);
    _.each(include, function(key) {
      if (self[key] === undefined) {
        console.error(key, self[key]);
      }
      player_obj[key] = self[key];
    });
    return player_obj;
  };

  PlayerSchema.methods.takeSeat = function(seat_num) {
    this.seat = seat_num;
  };

  PlayerSchema.methods.vacateSeat = function() {
    this.seat = undefined;
  };

  PlayerSchema.methods.setFlag = function(name, value) {
    /*if (name !== 'auto_post_blinds' || ! _.isBoolean(value)) {
      console.error('setFlag called with', name, value);
      return;
    }*/
    console.log(this.serialize(), 'setting', name, 'to', value);
    this.flags[name] = value;
  };

  PlayerSchema.methods.onConnect = function(socket) {
    this.socket = socket;
    this.sitting_out = false;
  };

  PlayerSchema.methods.onDisconnect = function(socket) {
    if (! (_.isObject(socket) && this.socket.id === socket.id) ) {
      console.error('Player.onDisconnect called with non-matching socket', socket);
    }
    this.sitting_out = true;
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