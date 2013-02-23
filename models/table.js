module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure db is connected

    , Room = require('./room')

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
  , messages: {
      sit: { handler: 'seatPlayer' }
    }
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var TableSchema = new Schema({
  // instance properties - document.field_name
    // uniquely identifies this table
    table_id: String
    // the corresponding room
  , room    : { type: ObjectId, ref: 'Room' }
    // [Player]
  , players : { type: [ObjectId], default: [] }
    // {seat_num: Player}
  , seats   : { type: Schema.Types.Mixed, default: {} }
    // current status
  , status  : { type: String, default: static_properties.STATUSES.INITIALIZING }
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
    var room = Room.createRoom({
      room_id: Table.TABLE_PREFIX + spec.table_id
    });
    return new Table(_.extend(spec, {
      room: room
    }));
  };

  TableSchema.statics.getTable = function(table_id) {
    // console.log('getting', table_id);
    return Room.getRoom(Table.TABLE_PREFIX + table_id);
  };

  // instance methods - document.method()
  TableSchema.methods.join = function(socket) {
    io.bindMessageHandlers.call(self, socket, static_properties.messages);
  };

  TableSchema.methods.seatPlayer = function(player, seat_num) {
    this.seats[seat_num] = player;
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