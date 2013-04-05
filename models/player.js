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
    , chips: { type: Number, default: 0 }
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
    player.initialize();
    return player;
  };

  // instance methods - document.method()
  PlayerSchema.methods.initialize = function() {
    var self = this;
    // set post_blind flag
    this.setFlag('post_blind', true);
    this.onConnect(this.socket);
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
      , auto_action
      , act_timeout;

    _.all(actions, function(action_params, action) {
      if (self.isFlagSet(action)) {
        auto_action = action;
        return false; //break
      }
    });

    if (_.isString(auto_action)) {
      console.log(auto_action, 'flag was set, so responding immediately!');
      cb(auto_action);
    }
    else {
      console.log('prompting', self.username, 'for next action', actions, timeout);
      self.sendMessage('act_prompt', actions, timeout);
      self.socket.once('act', function(action, num_chips) {
        console.log(self.username, 'responds with', action, num_chips);
        self.setFlag('receive_hole_cards', true);
        clearTimeout(act_timeout);
        cb(action, num_chips);
      });
      act_timeout = setTimeout(function() {
        console.log(self.username, 'fails to respond within', timeout, 'ms');
        self.setFlag('receive_hole_cards', false);
        self.socket.removeAllListeners('act');
        cb(default_action);
      }, timeout);
    }
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
    if (! this.isFlagSet('receive_hole_cards')) {
      this.sitOut();
    }
  };

  PlayerSchema.methods.sendMessage = function() {
    this.socket.emit.apply(this.socket, arguments);
  };

  PlayerSchema.methods.toObject = function() {
    return this.serialize(['chips_won', 'hand', 'has_acted']);
  };

  PlayerSchema.methods.serialize = function(also_include) {
    var self = this
      , default_include = ['username', 'seat', 'chips', 'current_bet', 'sitting_out']
      , include = _.union(default_include, also_include || [])
      , player_obj = {};
    //console.log('player.serialize called, include is', include);
    _.each(include, function(key) {
      /*if (self[key] === undefined) {
        console.error(key, self[key]);
      }*/
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

  static_properties.messages.sit_out = 'sitOut';
  PlayerSchema.methods.sitOut = function() {
    this.sitting_out = true;
    this.emit('sit_out');
  };

  static_properties.messages.sit_in = 'sitIn';
  PlayerSchema.methods.sitIn = function() {
    this.sitting_out = false;
    this.emit('sit_in');
  };

  PlayerSchema.methods.calculateAddChipsInfo = function(min_chips, max_chips, chips_per_maobuck, cb) {
    var self = this;
    self.socket.user.maobucks_inquire(function(err, maobucks) {
      if (err) {
        cb(err);
      }
      else {
        var balance_in_chips = maobucks * chips_per_maobuck
          , stack = self.chips
          , num_to_min = min_chips - stack
          , num_to_max = max_chips - stack
          , add_chips_info = {
              balance: maobucks
            , min: balance_in_chips >= num_to_min ? num_to_min : -1
            , max: balance_in_chips >= num_to_max ? num_to_max :
                   (balance_in_chips >= num_to_min ? balance_in_chips : -1)
            , stack: stack
            , chips_per_maobuck: chips_per_maobuck
        };
        self.add_chips_info = add_chips_info;
        cb(null, add_chips_info);
      }
    });
  };

  static_properties.messages.add_chips = 'addChips';
  PlayerSchema.methods.addChips = function(num_chips) {
    var self = this
      , add_chips_info = self.add_chips_info;
    console.log('in addChips!', add_chips_info);
    if (! _.isObject(add_chips_info)) {
      self.sendMessage('error', 'add_chips message received before get_add_chips_info!');
    }
    else if (add_chips_info.min === -1) {
      self.sendMessage('error', 'add_chips message received when player can\'t add chips to the table!');
    }
    else if (num_chips < add_chips_info.min) {
      self.sendMessage('error', 'cannot add fewer than ' + add_chips_info.min + ' chips!');
    }
    else if (num_chips > add_chips_info.max) {
      self.sendMessage('error', 'cannot add more than ' + add_chips_info.max + ' chips!');
    }
    else {
      self.socket.user.fetch(function(fetch_err, user) {
        var num_maobucks = num_chips / add_chips_info.chips_per_maobuck
          , new_maobucks = user.maobucks - num_maobucks;;
        if (fetch_err) {
          self.sendMessage('error', 'error while looking up user: ' + fetch_err.message || fetch_err);
        }
        else if (user.maobucks < num_maobucks) {
          self.sendMessage('error', 'player no longer has enough maobucks to add ' + num_chips + ' chips!');
        }
        else {
          user.update({ $set: { maobucks: new_maobucks } }, function(save_err) {
            if (save_err) {
              self.sendMessage('error', 'error while saving user: ' + save_err.message || save_err);
            }
            else {
              self.chips += num_chips;
              self.emit('chips_added', num_chips);
            }
          });
        }
      });
    }
  };

  static_properties.messages.set_flag = 'setFlag';
  PlayerSchema.methods.setFlag = function(name, value) {
    console.log(this.username, 'setting', name, 'to', value);
    this.flags[name] = value;
  };

  PlayerSchema.methods.isFlagSet = function(name) {
    return this.flags[name] || false;
  };

  PlayerSchema.methods.onConnect = function(socket) {
    var self = this;
    self.socket = socket;
    self.setFlag('receive_hole_cards', true);

    // override message-received trigger (called $emit) to log, trigger player event, then trigger
    var $emit = self.socket.$emit;
    self.socket.$emit = function() {
      var args_array = _.toArray(arguments);
      if (args_array[0] !== 'newListener') {
        console.log('(player) ' + self.username + ' sent:', args_array);
        // trigger event on this player object
        self.emit.apply(self, arguments);
        // trigger any message handlers as normal
        $emit.apply(self.socket, arguments);
      }
    };

    // attach handlers for messages as defined in Player.messages
    io.bindMessageHandlers.call(this, this.socket, static_properties.messages);
  };

  PlayerSchema.methods.onDisconnect = function(socket) {
    if (! (_.isObject(socket) && this.socket.id === socket.id) ) {
      console.error('Player.onDisconnect called with non-matching socket', socket);
    }
    this.setFlag('receive_hole_cards', false);
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