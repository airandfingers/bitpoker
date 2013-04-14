module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure db is connected

    , Room = require('./room')
    
    , Round = require('./round')
    , Player = require('./player');

  var static_properties = {
  // static properties (attached below) - Model.property_name
    // the number of tables to initialize in setup
    NUM_TABLES: 2
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
    // the corresponding room
  , room     : { type: Schema.Types.Mixed }
    // the rounds this table has gone through (oldest to newest)
  , rounds   : { type: [Schema.Types.Mixed], default: function() { return []; } }
    // the players that are currently at this table (seated or not)
  , players  : { type: Schema.Types.Mixed, default: function() { return {}; } }
    // {seat_num: Player}
  , seats    : { type: Schema.Types.Mixed, default: function() { return {}; } }
    // current dealer seat
  , dealer   : { type: Number, default: 0 }
  });

  // static methods - Model.method()
  TableSchema.statics.setup = function() {
    for (var i = 1; i <= Table.NUM_TABLES; i++) {
      Table.createTable({
        table_id: i
      });
    }
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

    self.newRound();

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

  TableSchema.methods.newRound = function() {
    var self = this
      , round_num = this.rounds.length + 1
      , round = Round.createRound({
          seats: this.seats
        , broadcast: function() { self.room.broadcast.apply(self.room, arguments); }
        , dealer: this.dealer
        , round_id: self.name + '.' + round_num
    });
    console.log('Pushing new round onto rounds, with round_id: ', this.rounds.length);
    this.rounds.push(round);
    
    round.onStage('done', function() {
      self.room.broadcast('reset_table');
      console.log('Round is over! Creating a new round in 1 second...');
      self.dealer = round.small_blind_seat || round.dealer;
      setTimeout(function() {
        self.newRound();
      }, 1000);
    });
    return round;
  };

  TableSchema.methods.getCurrentRound = function(status) {
    return _.last(this.rounds);
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
          , Round: Round
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
    player.onConnect(socket);
    // send current table state
    self.sendTableState(player);
  };

  static_properties.room_events.socket_leave = 'onSocketDisconnect';
  TableSchema.methods.onSocketDisconnect = function(socket) {
    var self = this
      , player = socket.player;

    if (player instanceof Player) {
      player.onDisconnect(socket);
    }
  };

  static_properties.player_events['message:sit'] = 'seatPlayer';
  TableSchema.methods.seatPlayer = function(player, seat_num) {
    var error;
    if (! _.isNumber(seat_num)) {
      error = 'sit message received with non-Number seat_num: ' + seat_num;
    }
    else if (seat_num < 0 || seat_num >= Round.MAX_PLAYERS) {
      error = 'sit message received with invalid seat_num: ' + seat_num;
    }
    else if (this.seats[seat_num] !== undefined) {
      error = 'A player is already sitting in seat ' + seat_num;
    }
    else if (player.seat) {
      error = 'Player is already sitting at the table!';
    }
    if (error) {
      console.error(error);
      player.socket.emit('error', error);
      return;
    }
    player.takeSeat(seat_num);
  };

  static_properties.player_events.sit = 'playerSits';
  TableSchema.methods.playerSits = function(player, seat_num) {
    var socket = player.socket
      , player_obj = player.serialize();
    this.seats[seat_num] = player;
    socket.emitToOthers('player_sits', player_obj, false);
    socket.emit('player_sits', player_obj, true);
  };

  static_properties.player_events['message:stand'] = 'unseatPlayer';
  TableSchema.methods.unseatPlayer = function(player) {
    var seat_num = player.seat;

    if (_.isUndefined(seat_num)) {
      console.error('Player is not sitting at the table!');
      player.socket.emit('error', 'Player is not sitting at the table!');
      return;
    }
    player.vacateSeat();
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
    this.room.broadcast('player_sits_out', player.serialize(), Round.SIT_OUT_TIME_ALLOWED);
  };

  static_properties.player_events.sit_in = 'playerSitsIn';
  TableSchema.methods.playerSitsIn = function(player) {
    this.room.broadcast('player_sits_in', player.serialize());
  };

  static_properties.player_events['message:get_table_state'] = 'sendTableState';
  TableSchema.methods.sendTableState = function(player, fields) {
    var self = this;
    fields = fields || 'all';
    self.getTableState(player.socket.user, fields, function(err, table_state) {
      player.socket.emit('table_state', table_state);
    })
  };

  TableSchema.methods.getTableState = function(user, round_include, cb) {
    var self = this
      , username = user.username
      , table_state = self.getCurrentRound().serialize(username, round_include)
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
        cb(null, table_state);
      }
    });
  };

  static_properties.player_events['message:get_add_chips_info'] = 'sendAddChipsInfo';
  TableSchema.methods.sendAddChipsInfo = function(player) {
    var add_chips_info = {
          table_name: this.name
        , small_blind:   Round.SMALL_BLIND
        , big_blind:     Round.BIG_BLIND
        , table_min:     Round.MIN_CHIPS
        , table_max:     Round.MAX_CHIPS
        , currency:      Round.CURRENCY
        , min_increment: Round.MIN_INCREMENT
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

  TableSchema.methods.isFull = function() {
    var num_players = _.keys(this.seats).length;
    return num_players === Round.MAX_PLAYERS;
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