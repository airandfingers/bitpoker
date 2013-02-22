module.exports = (function () {
  var mongoose = require('mongoose') //MongoDB abstraction layer
    , _ = require('underscore')
    , io
    
    , db = require('./db')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId

    , RoomSchema = new Schema({
      //instance properties
      room_id : String //this room's name and location
    });

  //class methods
  RoomSchema.statics.setup = function() {
    Room.ROOMS.forEach(function(room_id, i, ROOMS) {
      console.log('creating room', room_id, i, ROOMS);
      var room = Room.createRoom({
        room_id: room_id
      });
    });
  };

  RoomSchema.statics.getRoom = function(room_id) {
    console.log('getting', room_id);
    return Room.rooms[room_id];
  };

  //initialization
  RoomSchema.statics.createRoom = function(spec) {
    console.log('Room.createRoom called!');
    var room = new Room(spec);
    Room.rooms[room.room_id] = room;
    return room;
  };

  //instance methods
  RoomSchema.methods.join = function(socket) {
    var self = this;
    console.log('Socket joining ' + self.room_id + ':', socket.user_id);
    socket.join(self.room_id);
    socket.room_id = self.room_id;

    _.each(Room.messages, function(function_name, message_name) {
      socket.on(message_name, function() {
        //console.log(message_name + ' message sent to ' + self.room_id +
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
    });
  };

  RoomSchema.methods.broadcast = function(message_name) {
    io = io ||  require('./sockets');
    console.log(this.room_id, 'broadcasting message', arguments);
    var sockets = io.sockets.in(this.room_id);
    sockets.emit.apply(sockets, arguments);
  };

  var Room = mongoose.model('Room', RoomSchema);

  //class properties
  _.extend(Room, {
    ROOMS: ['lobby']
  , rooms: {}
  , messages: {
      chatMessage: 'broadcast'
    }
  });

  Room.setup();

  return {
    Model: Room
  , Schema: RoomSchema
  };
})();