module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure db is connected

    , Room = require('./room')
    
    , NoLimitGame = require('./no_limit_game')
    , HoldEmHand = require('./hold_em_hand')
    , Player = require('./player');

  var static_properties = {
  // static properties (attached below) - Model.property_name
  TABLE_CONSTANTS: ['SMALL_BLIND', 'MIN_CHIPS', 'MAX_CHIPS', 'MAX_PLAYERS'],
  // describes the constants to initialize tables with,
  // listing constants in TABLE_CONSTANTS' order
  TABLE_TYPES: [
// small blind    max stack
//          min stack    max players
    // SB     MIN    MAX    MAXP
      [   1,    5,   100,    10]
    , [   5,   25,   500,     2]
    , [  25,  100,  2500,     3]
    , [ 100,  500,   1E4,     4]
    , [ 500, 2500,   5E4,     5]
    , [2500,  1E4,  25E4,     6]
    , [ 1E4,  5E4,   1E6,     7]
    , [ 5E4, 25E4,   5E6,     8]
    , [25E4,  1E5,  25E6,     9]
    , [ 1E5,  5E5,   1E7,    10]
    , [ 5E5, 25E5,   5E7,    10]
    , [25E5,  1E6,  25E7,    10]
    , [ 1E6,  5E6,   1E8,    10]
    , [ 5E6, 25E6,   5E8,    10]
    , [25E6,100E6,  25E8,     2]
    ]
    // [this string] + table_id = room_name
  , TABLE_PREFIX: 'table_'
    // the events a Table should react to, on its room
    // {String event_name: String handler_name}
  , room_events: {}
    // the events a Table should react to, on each player
    // {String event_name: String handler_name}
  , player_events: {}
    // all the tables in the world (should this be private?)
  , tables: {}
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var TableSchema = new Schema({
  // instance properties - document.field_name
    // uniquely identifies this table
    table_id : String
    // readable name for this table (Table.TABLE_PREFIX + table_id)
  , name     : String
    // the game that this table creates hands of (e.g. NoLimitGame instance)
  , game     : { type: Schema.Types.Mixed }
    // the corresponding room
  , room     : { type: Schema.Types.Mixed }
    // the hands this table has gone through (oldest to newest)
  , hands   : { type: [Schema.Types.Mixed], default: function() { return []; } }
    // the players that are currently at this table (seated or not)
  , players  : { type: Schema.Types.Mixed, default: function() { return {}; } }
    // {seat_num: Player}
  , seats    : { type: Schema.Types.Mixed, default: function() { return {}; } }
    // current dealer seat
  , dealer   : { type: Number, default: 0 }
  });

  // static methods - Model.method()
  TableSchema.statics.setup = function() {
    var game
      , i = 0;
      //, sb_min_max_mbpc;
    _.each( Table.TABLE_TYPES, function(constants) {
      //sb_min_max_mbpc = constants.join('_');
      constants = _.object(Table.TABLE_CONSTANTS, constants);
      game = NoLimitGame.createNoLimitGame(constants);
      Table.createTable({
        //table_id: sb_min_max_mbpc + '_a' // constants plus a (first table of this type)
        table_id: ++i
      , game: game
      });
    });
  };

  TableSchema.statics.createTable = function(spec) {
    console.log('creating table', spec.table_id);
    var table = new Table(spec);
    table.initialize();

    return table;
  };

  TableSchema.statics.getTable = function(table_id) {
    // console.log('getting', table_id);
    return Table.tables[Table.TABLE_PREFIX + table_id];
  };

  TableSchema.statics.getTableNames = function() {
    // console.log('getting tables');
    return _.keys(Table.tables);
  };

  TableSchema.statics.getTableGames = function() {
    // console.log('getting table games');
    var table_games = []
      , table_game;
    _.each(Table.tables, function(table, table_name) {
      table_game = { game: table.game };
      table_game.table_name = table_name;
      table_game.table_id = table.table_id;
      table_game.seats_taken = table.getNumSeatsTaken();
      table_games.push(table_game);
    });
    //console.log('Returning table_games:', table_games);
    return table_games;
  };

  // instance methods - document.method()
  TableSchema.methods.initialize = function() {
    var self = this
      , table_id = self.table_id
      , name = Table.TABLE_PREFIX + table_id
      , room = Room.createRoom({
          room_id: name
      });

    self.set({
      name: name
    , room: room
    });

    self.newHand();

    _.each(Table.room_events, function(handler_name, event_name) {
      var handler = self[handler_name];
      if (! _.isFunction(handler)) {
        console.error('room_event points to non-function', handler);
      }
      else {
        self.room.on(event_name, function() {
          //console.log(event_name, 'triggered with', arguments, '; calling', handler);
          handler.apply(self, arguments);
        });
      }
    });

    Table.tables[name] = self;
  };

  TableSchema.methods.newHand = function() {
    var self = this
      , hand_num = self.hands.length + 1
      , hand = HoldEmHand.createHoldEmHand({
          hand_id: self.name + '.' + hand_num
        , game: self.game
        , seats: self.seats
        , broadcast: function() { self.room.broadcast.apply(self.room, arguments); }
        , dealer: self.dealer
        , initial_pot: self.initial_pot || 0
        
    });
    console.log('Pushing new hand onto hands, with hand_id: ', self.hands.length);
    self.hands.push(hand);
    
    hand.onStage('done', function() {
      self.room.broadcast('reset_table');
      console.log('Hand is over! Creating a new hand in 1 second...');
      self.dealer = hand.dealer + 1;
      self.initial_pot = hand.pot_remainder;
      setTimeout(function() {
        self.newHand();
      }, 1000);
    });
    return hand;
  };

  TableSchema.methods.getCurrentHand = function(status) {
    return _.last(this.hands);
  };

  static_properties.room_events.socket_join = 'onSocketConnect';
  TableSchema.methods.onSocketConnect = function(socket) {
    var self = this
      , user = socket.user
      , username = user.username
      , player = self.players[username];
    if (! (player instanceof Player)) {
      // create a new player
      player = Player.createPlayer({
            username: username
          , game: self.game
          , table: self
      });
      self.players[username] = player;
      // attach handlers for events as defined in Table.player_events
      console.log('Created player', username, ', binding player events');
      _.each(Table.player_events, function(handler_name, event_name) {
        var handler = self[handler_name];
        if (! _.isFunction(handler)) {
          console.error('player_event points to non-function', handler);
        }
        else {
          player.on(event_name, function() {
            var args_array = _.toArray(arguments);
            // add player as first argument
            args_array.unshift(player);
            //console.log(event_name, 'triggered with', args_array, '; calling', handler);
            handler.apply(self, args_array);
          });
        }
      });
    }
    else {
      console.log('Socket joined with existing player', player);
    }
    // set socket.player to player
    socket.player = player;
    // set player.socket to socket
    player.socket = socket;
    // send current table state
    self.sendTableState(player, null, function() {
      // augment the socket and send act_prompt if applicable
      player.onConnect(socket);
    });
  };

  static_properties.room_events.socket_leave = 'onSocketDisconnect';
  TableSchema.methods.onSocketDisconnect = function(socket) {
    var self = this
      , player = socket.player;

    if (player instanceof Player) {
      player.onDisconnect(socket);
    }
  };

  static_properties.player_events.sit = 'playerSits';
  TableSchema.methods.playerSits = function(player, seat_num) {
    var socket = player.socket
      , player_obj = player.serialize();
    this.seats[seat_num] = player;
    socket.emitToOthers('player_sits', player_obj, false);
    socket.emit('player_sits', player_obj, true);
  };

  static_properties.player_events.stand = 'playerStands';
  TableSchema.methods.playerStands = function(player, seat_num) {
    var socket = player.socket
      , player_obj = player.serialize();
      delete this.seats[seat_num];
    socket.emitToOthers('player_stands', player_obj, seat_num, false);
    socket.emit('player_stands', player_obj, seat_num, true);
  };

  static_properties.player_events.sit_out = 'playerSitsOut';
  TableSchema.methods.playerSitsOut = function(player) {
    this.room.broadcast('player_sits_out', player.serialize(), this.game.SIT_OUT_TIME_ALLOWED);
  };

  static_properties.player_events.sit_in = 'playerSitsIn';
  TableSchema.methods.playerSitsIn = function(player) {
    this.room.broadcast('player_sits_in', player.serialize());
  };

  static_properties.player_events['message:get_table_state'] = 'sendTableState';
  TableSchema.methods.sendTableState = function(player, fields, cb) {
    var self = this;
    fields = fields || 'all';
    self.getTableState(player.socket.user, fields, function(err, table_state) {
      player.socket.emit('table_state', table_state);
      if (_.isFunction(cb)) cb();
    })
  };

  TableSchema.methods.getTableState = function(user, hand_include, cb) {
    var self = this
      , username = user.username
      , table_state = self.getCurrentHand().serialize(username, hand_include)
      , player = self.players[username];
    table_state.table_name = self.name;
    if (player instanceof Player) {
      table_state.num_chips = player.num_chips;
    }
    else {
      console.error('No player currently exists for username', username);
    }
    user.maobucks_inquire(function(err, maobucks) {
      if (err) {
        console.error('Error while looking up number of maobucks:', err);
        cb(err);
      }
      else {
        table_state.balance = maobucks;
        if (_.isFunction(cb)) cb(null, table_state);
      }
    });
  };

  static_properties.player_events['message:get_add_chips_info'] = 'sendAddChipsInfo';
  TableSchema.methods.sendAddChipsInfo = function(player) {
    var add_chips_info = {
          table_name: this.name
        , small_blind:   this.game.SMALL_BLIND
        , big_blind:     this.game.BIG_BLIND
        , table_min:     this.game.MIN_CHIPS
        , table_max:     this.game.MAX_CHIPS
        , currency:      this.game.CURRENCY
        , min_increment: this.game.MIN_INCREMENT
    };
    player.calculateAddChipsInfo(function(err, player_add_chips_info) {
      if (err) {
        console.error('Error during Player.calculateAddChipsInfo:', err);
        player.sendMessage('error', err.message || err);
      }
      else {
        _.extend(add_chips_info, player_add_chips_info);
        player.sendMessage('add_chips_info', add_chips_info);
      }
    });
  };

  static_properties.player_events.chips_added = 'playerAddsChips';
  TableSchema.methods.playerAddsChips = function(player, num_chips) {
    var socket = player.socket;
    socket.emitToOthers('player_adds_chips', player.serialize(), false);
    socket.emit('player_adds_chips', player.serialize(), true);
  };

  TableSchema.methods.getNumSeatsTaken = function() {
    var num_players = _.keys(this.seats).length;
    return num_players;
  };

  TableSchema.methods.isFull = function() {
    var num_players = this.getNumSeatsTaken();
    return num_players === this.game.MAX_PLAYERS;
  }

  TableSchema.methods.getPlayer = function(username) {
    var player = this.players[username];
    return player;
  }

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var Table = mongoose.model('Table', TableSchema);

  // static properties (defined above)
  _.extend(Table, static_properties);

  Table.setup();

  return Table;
})();