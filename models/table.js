module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure db is connected

    , Room = require('./room')
    , User = require('./user')
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
  , messages: {
      sit: { handler: 'seatPlayer', pass_socket: true }
    , stand: { handler: 'unseatPlayer', pass_socket: true }
    }
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var TableSchema = new Schema({
  // instance properties - document.field_name
    // uniquely identifies this table
    table_id: String
    // the corresponding room
  , room    : { type: Schema.Types.Mixed }
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
    var room = Room.createRoom({
      room_id: Table.TABLE_PREFIX + spec.table_id
    })
      , table = new Table(_.extend(spec, { room: room }));

    room.setJoinHandler(function(socket) {
      table.join(socket);
    });

    table.setStatus(static_properties.STATUSES.WAITING);

    return table;
  };

  TableSchema.statics.getTable = function(table_id) {
    // console.log('getting', table_id);
    return Room.getRoom(Table.TABLE_PREFIX + table_id);
  };

  // instance methods - document.method()
  TableSchema.methods.setStatus = function(status) {
    if (! _.contains(static_properties.STATUSES, status)) {
      console.error('setStatus called with', status);
    }
    else {
      this.status = status;
    }
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
        , chips: 1000
        });
        self.players[user_id] = player;

        if (self.players.length > 2) {
          //self.round = Round.createRound
        }
      }
    });

    io.bindMessageHandlers.call(this, socket, static_properties.messages);
  };

  TableSchema.methods.seatPlayer = function(socket, seat_num) {
    var player = this.players[socket.user_id].toObject();
    this.seats[seat_num] = player;
    socket.broadcast.emit('player_sits', player, seat_num, false);
    socket.emit('player_sits', player, seat_num, true);
  };

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