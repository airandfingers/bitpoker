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
    // the statuses this table can be in
    STATUSES: {
      INITIALIZING: 'initializing'
    , WAITING: 'waiting'
    , GAME_IN_PROGRESS: 'game_in_progress'
    , CLOSING: 'closing'
    }
    // the number of tables to initialize in setup
  , NUM_TABLES: 2
    // [this string] + table_id = room_name
  , TABLE_PREFIX: 'table_'
    // the message a Table should react to, on its socket
    // {String message_name: {handler: Function, pass_socket: Boolean}}
  , messages: {}
    // the events a Table should react to, on itself
    // {String event_name: Function event_handler}
  , events: {}
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
  , rounds   : { type: [Schema.Types.Mixed], default: [] }
    // [Player]
  , players  : { type: Schema.Types.Mixed, default: {} }
    // {seat_num: Player}
  , seats    : { type: Schema.Types.Mixed, default: {} }
    // current status
  , status   : { type: String, default: static_properties.STATUSES.INITIALIZING }
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

    room.on('socket_join', function(socket) {
      self.join(socket);
    });

    /*room.on('socket_leave', function(socket) {
      self.leave(socket);
    });*/

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
    var self = this
      , round = Round.createRound({
      seats: this.seats
    , broadcast: this.room.broadcast
    , dealer: this.dealer
    });
    this.rounds.push(round);
    round.onStage('done', function() {
      console.log('Round is over!');
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
        var username = user.username
          , player = Player.createPlayer({
              socket: socket
            , username: username
        });
        self.players[user_id] = player;
        socket.username = username;
      }
    });

    io.bindMessageHandlers.call(this, socket, Table.messages);
  };

  /*TableSchema.methods.leave = function(socket) {
    var self = this
      , user_id = socket.user_id
      , player = self.players[user_id];

    delete self.players[user_id];

    _.each(self.seats, function(p, seat_num) {
      if (p.username === player.username) {
        delete self.seats[seat_num];
      }
    });
  };*/

  static_properties.messages.sit = { handler: 'seatPlayer', pass_socket: true };
  TableSchema.methods.seatPlayer = function(socket, seat_num, num_chips) {
    if (this.seats[seat_num] !== undefined) {
      console.error('A player is already sitting in seat ' + seat_num);
      socket.emit('error', 'A player is already sitting in seat ' + seat_num);
      return;
    }
    var player = this.players[socket.user_id]
      , player_obj = player.toObject()
      , already_sitting = _.any(this.seats, function(p, n) {
        return p.username === player.username;
    });
    if (already_sitting) {
      console.error('Player is already sitting at the table!');
      socket.emit('error', 'Player is already sitting at the table!');
      return;
    }
    player.chips = num_chips;
    this.seats[seat_num] = player;
    socket.broadcast.emit('player_sits', player_obj, seat_num, false);
    socket.emit('player_sits', player_obj, seat_num, true);
    var current_round = this.getCurrentRound();
    if (this.hasStatus(Table.STATUSES.WAITING) && 
        _.keys(this.seats).length >= Round.MIN_PLAYERS) {
      this.setStatus(Table.STATUSES.GAME_IN_PROGRESS);
      current_round.nextStage();
    }
  };

  static_properties.messages.stand = { handler: 'unseatPlayer', pass_socket: true };
  TableSchema.methods.unseatPlayer = function(socket, seat_num) {
    var player_obj = this.players[socket.user_id].toObject();
    this.seats[seat_num] = null;
    socket.broadcast.emit('player_stands', player_obj, seat_num, false);
    socket.emit('player_stands', player_obj, seat_num, true);
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