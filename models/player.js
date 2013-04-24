module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure mongoose is connected

    , async = require('async') // sync/async control flow library

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
      // which stages this player has acted in, in the current hand
    , has_acted: { type: Schema.Types.Mixed, default: function() { return {}; } }
      // the number of chips thie player won this hand, if any
    , chips_won: { type: Number, default: 0 }
      // a reference to the game class which describes the game this player is playing
    , game: Schema.Types.Mixed
      // a reference to the table on which this player is playing
    , table: Schema.Types.Mixed
      // whether this player is currently participating in a hand
    , in_hand: Boolean
      // actions this player will perform once the current hand is over
    , pending_actions: { type: Schema.Types.Mixed, default: function() { return {}; } }
      // whether this player is currently sitting out (not participating in future hands)
    , sitting_out: Boolean
      // whether this player is currently disconnected
    , disconnected: Boolean
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
  };

  PlayerSchema.methods.makeBet = function(amount) {
    var game = this.game
      , rounded_amount = game.roundNumChips(amount);
    if (rounded_amount !== amount) {
      console.error('Invalid amount:', amount, game.MIN_INCREMENT);
      amount = rounded_amount;
    }
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

  // only called when we've raised beyond another player's chipstack
  PlayerSchema.methods.getBet = function(amount) {
    var game = this.game
      , rounded_amount = game.roundNumChips(amount);
    if (rounded_amount !== amount) {
      console.error('Invalid amount:', amount, game.MIN_INCREMENT);
      amount = rounded_amount;
    }
    this.chips += amount;
    this.current_bet -= amount;
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
        self.idle = false;
        clearTimeout(act_timeout);
        cb(action, num_chips);
      });
      act_timeout = setTimeout(function() {
        console.log(self.username, 'fails to respond within', timeout, 'ms');
        self.idle = true;
        self.socket.removeAllListeners('act');
        cb(default_action);
      }, timeout);
    }
  };

  PlayerSchema.methods.actedIn = function(stage) {
    //console.log('player acted in', stage);
    this.has_acted[stage] = true;
  };

  PlayerSchema.methods.hasActedIn = function(stage) {
    //console.log('has player acted in', stage, '?', this.has_acted[stage] || false);
    return this.has_acted[stage] || false;
  };

  PlayerSchema.methods.handOver = function() {
    var self = this
      , action_order = ['addChips', 'sitOut', 'vacateSeat']
      , complete_events = {
          addChips: 'chips_added'
        , sitOut: 'sit_out'
        , vacateSeat: 'stand'
    }
      , actions = [];
    
    _.each(action_order, function(method_name) {
      var args_array = self.pending_actions[method_name];
      if (_.isArray(args_array)) {
        actions.push(function(acb) {
          self.performAction(method_name, args_array);
          // wait until the event that the method triggers when it's done
          self.once(complete_events[method_name], function() { acb(); });
        });
      }
    });
    async.series(actions, function onComplete(err, result) {
      if (err) {
        // will never get called (acb's aren't given arguments)
        console.error('error during pending_actions:', err);
      }
    });
    self.pending_actions = {};
    self.hand = [];
    self.has_acted = {};
    self.chips_won = 0;
    self.in_hand = false;
    if (self.idle) {
      self.sitOut();
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

  static_properties.messages.sit = 'handleSit';
  PlayerSchema.methods.handleSit = function(seat_num) {
    var error
      , game = this.game;
    if (! _.isNumber(seat_num)) {
      error = 'sit message received with non-Number seat_num: ' + seat_num;
    }
    else if (seat_num < 0 || seat_num >= game.MAX_PLAYERS) {
      error = 'sit message received with invalid seat_num: ' + seat_num;
    }
    else if (this.table.seats[seat_num] !== undefined) {
      error = 'A player is already sitting in seat ' + seat_num;
    }
    else if (this.seat) {
      error = 'Player is already sitting at the table!';
    }
    if (error) {
      console.error(error);
      this.sendMessage('error', error);
    }
    else {
      this.takeSeat(seat_num);
    }
  };

  function first_buyin_handler(self) {
    if (! _.isFunction(self._first_buyin_handler)) {
      self._first_buyin_handler = function() {
        self.sitIn();
      };
    }
    return self._first_buyin_handler;
  }
  PlayerSchema.methods.takeSeat = function(seat_num) {
    var self = this;
    self.seat = seat_num;
    self.once('chips_added', first_buyin_handler(self));
    // emit the "sit" event
    this.emit('sit', seat_num);
  };

  static_properties.messages.stand = 'handleStand';
  PlayerSchema.methods.handleStand = function() {
    var error;
    if (_.isUndefined(this.seat)) {
      error = 'Player is not sitting at the table!';
    }
    if (error) {
      console.error(error);
      this.sendMessage('error', error);
    }
    else {
      this.pendAction('vacateSeat');
    }
  };

  PlayerSchema.methods.vacateSeat = function() {
    var self = this
      , game = self.game
      , seat_num = self.seat;
    self.seat = undefined;
    // clear the sit-out timer, if any
    clearInterval(self.full_table_check);
    // clear the sit-in-on-first-buyin timer, if any
    self.removeListener('chips_added', first_buyin_handler(self));
    
    if (self.chips < 0) {
      console.error('player attempted to cash out with ' + self.chips + ' chips! resetting to 0..');
      self.chips = 0;
      // emit the "stand" event
      self.emit('stand', seat_num);
    }
    else if (self.chips === 0) {
      // emit the "stand" event
      self.emit('stand', seat_num);
    }
    else if (self.chips > 0) {
      // credit this player's account with the appropriate number of maobucks
      self.socket.user.fetch(function(fetch_err, user) {
        if (fetch_err) {
          self.sendMessage('error', 'error while looking up user: ' + fetch_err.message || fetch_err);
          return;
        }
        var stack_in_maobucks = self.chips * game.MAOBUCKS_PER_CHIP
          , new_maobucks = user.maobucks + stack_in_maobucks;
        user.update({ $set: { maobucks: new_maobucks } }, function(save_err) {
          if (save_err) {
            self.sendMessage('error', 'error while saving user: ' + save_err.message || save_err);
            return;
          }
          else {
            if (self.chips > game.MIN_CHIPS) {
              self.min_buyin = self.chips;
              self.min_buyin_timeout = setTimeout(function() {
                delete self.min_buyin;
              }, game.MIN_BUYIN_TIME_ENFORCED);
            }
            self.chips = 0;
            // emit the "stand" event
            self.emit('stand', seat_num);
          }
        });
      });
    }
  };

  static_properties.messages.sit_out = 'handleSitOut';
  PlayerSchema.methods.handleSitOut = function() {
    var error;
    /*if (this.sitting_out) {
      error = 'sitOut called when', self.username, 'is already sitting out!';
    }*/
    if (error) {
      console.error(error);
      this.sendMessage('error', error);
    }
    else {
      this.pendAction('sitOut');
    }
  };

  PlayerSchema.methods.sitOut = function() {
    var self = this
      , game = self.game;
    if (! self.sitting_out) {
      self.sitting_out = true;
      self.setFlag('post_blind', false);
      // set sit-out timer
      console.log('setting sit_out_timer', game.SIT_OUT_TIME_ALLOWED);
      self.full_table_check = setInterval(function() {
        if (self.table.isFull()) {
          self.vacateSeat();
        }
      }, game.SIT_OUT_TIME_ALLOWED);
      // emit the "sit_out" event
      self.emit('sit_out');
    }
    else {
      console.log('sitOut called when', self.username, 'is already sitting out!');
    }
  };

  static_properties.messages.sit_in = 'sitIn';
  PlayerSchema.methods.sitIn = function() {
    console.log('sitIn called!');
    if (this.sitting_out) {
      this.sitting_out = false;
      this.setFlag('post_blind', true);
      this.emit('sit_in');
      // clear the sit-out timer, if any
      clearTimeout(this.sit_out_timer);
    }
    else {
      console.log('sitIn called when', this.username, 'is not sitting out!');
    }
  };

  PlayerSchema.methods.calculateAddChipsInfo = function(cb) {
    var self = this
      , game = self.game;
    self.socket.user.maobucks_inquire(function(err, maobucks) {
      if (err) {
        cb(err);
      }
      else {
        var maobucks_per_chip = game.MAOBUCKS_PER_CHIP
          , balance_in_chips = game.roundNumChips(maobucks / maobucks_per_chip)
          , stack = self.chips
          , num_to_min = game.MIN_CHIPS - stack
          , num_to_max = game.MAX_CHIPS - stack
          , add_chips_info = {
              balance: maobucks
            , balance_in_chips: balance_in_chips
            , stack: stack
            , maobucks_per_chip: maobucks_per_chip
          }
          ,  min_buyin = self.min_buyin
          , min
          , max;
        // set min and max
        if (! _.isNumber(min_buyin)) {
          min_buyin = 0;
        }
        min = _.max([min_buyin, num_to_min]);
        max = _.max([min_buyin, num_to_max]);
        if (balance_in_chips < min) {
          min = max = -1;
        }
        _.extend(add_chips_info, {
          min: min
        , max: max
        });
        self.add_chips_info = add_chips_info;
        cb(null, add_chips_info);
      }
    });
  };

  static_properties.messages.add_chips = 'handleAddChips';
  PlayerSchema.methods.handleAddChips = function(num_chips) {
    var self = this
      , game = self.game
      , error
      , rounded_num_chips
      , add_chips_info = self.add_chips_info;
    // validate the num_chips and that a get_add_chips_info was sent
    if (! _.isNumber(num_chips)) {
      error = 'add_chips message received with non-Number num_chips: ' + num_chips;
    }
    else {
      rounded_num_chips = game.roundNumChips(num_chips);
      if (rounded_num_chips !== num_chips) {
        console.error('add_chips message sent with unrounded num_chips:', num_chips, game.MIN_INCREMENT);
        num_chips = rounded_num_chips;
      }
    }
    if (! _.isObject(add_chips_info)) {
      error = 'add_chips message received before add_chips_info was sent!';
    }
    else if (add_chips_info.min === -1) {
      error = 'add_chips message received when player after -1 add_chips_info!';
    }
    if (error) {
      self.sendMessage('error', error);
      return;
    }
    else {
      self.pendAction('addChips', num_chips);
    }
  };

  PlayerSchema.methods.addChips = function(num_chips) {
    var self = this
      , game = self.game
      , stack = self.chips
      , num_to_max = game.MAX_CHIPS - stack // current max buyin
      , sent_min = self.add_chips_info.min // min sent in last add_chips_info message
      , sent_balance_in_chips = self.add_chips_info.balance_in_chips // balance sent in last add_chips_info message
      , error;
    if (num_chips > sent_balance_in_chips) {
      error = 'add_chips request exceeds player\'s chip balance: ' + sent_balance_in_chips;
    }
    else if (num_chips < 0) {
      error = 'cannot add negative numbers of chips!';
    }
    else if (num_chips < sent_min) {
      error = 'cannot add fewer than ' + sent_min + ' chips!';
    }
    else if (num_chips > num_to_max) {
      //self.sendMessage('error', 'cannot add more than ' + num_to_max + ' chips!');
      console.error('cannot add more than ' + num_to_max + ' chips, so limiting to ' + num_to_max);
      num_chips = num_to_max;
    }
    if (error) {
      self.sendMessage('error', error);
      return;
    }
    self.socket.user.fetch(function(fetch_err, user) {
      if (fetch_err) {
        self.sendMessage('error', 'error while looking up user: ' + fetch_err.message || fetch_err);
        return;
      }
      var num_maobucks = num_chips * game.MAOBUCKS_PER_CHIP
        , new_maobucks = user.maobucks - num_maobucks;
      if (new_maobucks < 0) {
        self.sendMessage('error', 'player no longer has enough maobucks to add ' + num_chips + ' chips!');
        return;
      }
      else {
        user.update({ $set: { maobucks: new_maobucks } }, function(save_err) {
          if (save_err) {
            self.sendMessage('error', 'error while saving user: ' + save_err.message || save_err);
            return;
          }
          else {
            self.chips += num_chips;
            self.emit('chips_added', num_chips);
          }
        });
      }
    });
  };

  static_properties.messages.set_flag = 'setFlag';
  PlayerSchema.methods.setFlag = function(name, value) {
    console.log(this.username, 'setting', name, 'to', value);
    this.flags[name] = value;
  };

  static_properties.messages.set_flags = 'setFlags';
  PlayerSchema.methods.setFlags = function(flags) {
    var self = this;
    _.each(flags, function(value, name) {
      self.setFlag(name, value);
    });
  };

  PlayerSchema.methods.isFlagSet = function(name) {
    return this.flags[name] || false;
  };

  PlayerSchema.methods.onConnect = function(socket) {
    var self = this;
    self.socket = socket;
    self.disconnected = false;

    // override message-received trigger (called $emit) to log, trigger player event, then trigger
    var $emit = self.socket.$emit;
    self.socket.$emit = function() {
      var args_array = _.toArray(arguments)
        , message_name = args_array[0]
        , event_name = 'message:' + message_name;
      if (args_array[0] !== 'newListener') {
        console.log('(player) ' + self.username + ' sent:', args_array);
        // trigger event (prefixed by "message:") on this player object
        args_array[0] = event_name;
        self.emit.apply(self, args_array);
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
    this.disconnected = true;
  };

  PlayerSchema.methods.pendAction = function(method_name) {
    var args_array = _.toArray(arguments)
      , action_to_english = {
          addChips : 'add chips'
        , vacateSeat : 'stand'
        , sitOut : 'sit out'
    };
    args_array.shift(); // remove method_name from arguments
    if (this.in_hand) {
      this.pending_actions[method_name] = args_array;
      // notify user that the requested action has been delayed
      var message = 'You will ' + action_to_english[method_name] + ' as soon as the hand is over.';
      this.sendMessage('error', message);
    }
    else {
      this.performAction(method_name, args_array);
    }
  };

  PlayerSchema.methods.performAction = function(method_name, args_array) {
    var handler = this[method_name];
    if (_.isFunction(handler)) {
      handler.apply(this, args_array);
    }
    else {
      console.error('player has no function', method_name);
    }
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