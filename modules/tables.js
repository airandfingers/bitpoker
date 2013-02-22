module.exports = (function () {
  var mongoose = require('mongoose') //MongoDB abstraction layer
    , _ = require('underscore')
    , io
    
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId

    , rooms = require('./rooms')
    , RoomSchema = rooms.Schema
    , Room = rooms.Model

    , constants = {
      STATUSES: {
        INITIALIZING: 'initializing'
      , WAITING: 'waiting'
      , GAME_IN_PROGRESS: 'game_in_progress'
      , CLOSING: 'closing'
      }
    , NUM_TABLES: 2
    , TABLE_PREFIX: 'table_'
    , messages: {
        sit: 'seatPlayer'
      }
    }

    , TableSchema = new Schema({
      //instance properties
      table_id: String // uniquely identifies this table
    , room    : { type: ObjectId, ref: 'Room' } // the corresponding room
    , players : { type: [ObjectId], default: [] } // [Player]
    , seats   : { type: Schema.Types.Mixed, default: {} } // {seat_num: Player}
    , status  : { type: String, default: constants.STATUSES.INITIALIZING } // current status
    });

  //class methods
  TableSchema.statics.setup = function() {
    for (var i = 1; i <= Table.NUM_TABLES; i++) {
      console.log('creating table', i);
      Table.createTable({
        table_id: i
      });
    }
  };

  TableSchema.statics.createTable = function(spec) {
    console.log('Table.createTable called!');
    var room = Room.createRoom({
      room_id: Table.TABLE_PREFIX + spec.table_id
    });
    return new Table(_.extend(spec, {
      room: room
    }));
  };

  TableSchema.statics.getTable = function(table_id) {
    //console.log('getting', table_id);
    return Room.getRoom(Table.TABLE_PREFIX + table_id);
  };

  //instance methods
  TableSchema.methods.join = function(socket) {
    /*var self = this;
    //console.log('Socket joining ' + self.table_id + ':', socket.user_id);
    socket.join(self.table_id);
    socket.room_id = self.table_id;

    $.ObjectEach(Table.messages, function(function_name, message_name) {
      socket.on(message_name, function() {
        //console.log(message_name + ' message sent to ' + self.table_id +
        //            ' from ' + socket.user_id + ' with ', arguments);
        if (function_name === 'broadcast') {
          //add the message_name to the arguments list
          var argsArray = [].slice.apply(arguments);
          argsArray.unshift(message_name);
          self.broadcast.apply(self, argsArray);
        }
        else {
          self[function_name].apply(self, arguments);
        }
      });
    });*/
  };

  TableSchema.methods.seatPlayer = function(player, seat_num) {
    this.seats[seat_num] = player;
  };

  var Table = mongoose.model('Table', TableSchema);

  //class properties
  _.extend(Table, constants);

  Table.setup();

  return {
    Model: Table
  , Schema: TableSchema
  };
})();