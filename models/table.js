module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure db is connected

    , Room = require('./room')
    , User = require('./user')
    , Round = require('./round')
    , Player = require('./player');

  var static_properties = {
  // static properties (attached below) - Model.property_name
    //
    STATUSES: {
      INITIALIZING: 'initializing'
    , WAITING: 'waiting'
    , GAME_IN_PROGRESS: 'game_in_progress'
    , CLOSING: 'closing'
    }
  , NUM_TABLES: 2
  , TABLE_PREFIX: 'table_'
  , MIN_PLAYERS: 2
  , messages: {}
  , tables: {}
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var TableSchema = new Schema({
  // instance properties - document.field_name
    // uniquely identifies this table
    table_id: String
    // readable name for this table (Table.TABLE_PREFIX + table_id)
  , name: String
    // the corresponding room
  , room    : { type: Schema.Types.Mixed }
    // the rounds this table has gone through (oldest to newest)
  , rounds   : { type: [Schema.Types.Mixed], default: [] }
    // [Player]
  , players : { type: Schema.Types.Mixed, default: {} }
    // {seat_num: Player}
  , seats   : { type: Schema.Types.Mixed, default: {} }
    // current status
  , status  : { type: String, default: static_properties.STATUSES.INITIALIZING }
  }, { discriminatorkey: 'game' });

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

    room.on('socket_join', function(socket) {
      self.join(socket);
    });

    self.setStatus(static_properties.STATUSES.WAITING);

    Table.tables[name] = self;
  };

  TableSchema.methods.setStatus = function(status) {
    if (! _.contains(Table.STATUSES, status)) {
      console.error('setStatus called with', status);
    }
    else {
      this.status = status;
    }
  };

  TableSchema.methods.hasStatus = function(status) {
    return this.status === status;
  };

  TableSchema.methods.newRound = function() {
    var round = Round.createRound({
      players: this.players
    , table: this
    });
    this.rounds.push(round);
    round.on('begin', function() {
      console.log('Round has begun!');
    });
  };

  TableSchema.methods.getCurrentRound = function(status) {
    return _.last(this.rounds);
  };

  TableSchema.methods.join = function(socket) {
    var self = this
      , user_id = socket.user_id;
    User.findById(user_id, 'username', function(err, user) {
      if (err) { return done(err); }
      if (! user) {
        console.error( 'No user found with id', user_id, '!' );
      }
      else {
        var player = Player.createPlayer({
          table: self
        , socket: socket
        , username: user.username
        });
        self.players[user_id] = player;
      }
    });

    io.bindMessageHandlers.call(this, socket, Table.messages);
  };

  static_properties.messages['sit'] = { handler: 'seatPlayer', pass_socket: true };
  TableSchema.methods.seatPlayer = function(socket, seat_num) {
    if (this.seats[seat_num] !== undefined) {
      console.error('A player is already sitting in seat ' + seat_num);
      socket.emit('error', 'A player is already sitting in seat ' + seat_num);
      return;
    }
    var player = this.players[socket.user_id].toObject()
      , already_sitting = _.any(this.seats, function(p, n) {
        return p.username === player.username;
    });
    if (already_sitting) {
      console.error('Player is already sitting at the table!');
      socket.emit('error', 'Player is already sitting at the table!');
      return;
    }
    this.seats[seat_num] = player;
    socket.broadcast.emit('player_sits', player, seat_num, false);
    socket.emit('player_sits', player, seat_num, true);
    if (this.hasStatus(Table.STATUSES.WAITING) && _.keys(this.seats).length >= Table.MIN_PLAYERS) {
      this.setStatus(Table.STATUSES.GAME_IN_PROGRESS)
      this.getCurrentRound().emit('begin');
    }
  };

  static_properties.messages['stand'] = { handler: 'unseatPlayer', pass_socket: true };
  TableSchema.methods.unseatPlayer = function(socket, seat_num) {
    var player = this.players[socket.user_id].toObject();
    this.seats[seat_num] = null;
    socket.broadcast.emit('player_stands', player, seat_num, false);
    socket.emit('player_stands', player, seat_num, true);
  };

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