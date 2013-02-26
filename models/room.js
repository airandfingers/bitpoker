module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure db is connected

    /* the schema - defines the "shape" of the documents:
     *   gets compiled into one or more models */
    , RoomSchema = new Schema({
    // instance properties
      // this room's name and location
      room_id : String 
    });

  var static_properties = {
  // static properties (attached below) - Model.property_name
    // list of rooms to be created in Room.setup
    ROOMS: ['lobby']
    // existing rooms, { room_id: room_document }
  , rooms: {}
    // message-to-handler map, { message_name: instance_method_name }
  , messages: {
      chatMessage: { handler: 'broadcast', pass_message_name: true }
    }
  };

  // static methods - Model.method()
  RoomSchema.statics.setup = function() {
    static_properties.ROOMS.forEach(function(room_id, i, ROOMS) {
      var room = Room.createRoom({
        room_id: room_id
      });
    });
  };

  RoomSchema.statics.createRoom = function(spec) {
    console.log('creating room:', spec.room_id);
    var room = new Room(spec);
    static_properties.rooms[room.room_id] = room;
    return room;
  };

  RoomSchema.statics.getRoom = function(room_id) {
    //console.log('getting', room_id);
    return static_properties.rooms[room_id];
  };

  // instance methods - document.method()
  RoomSchema.methods.join = function(socket) {
    var self = this;
    //console.log('Socket joining ' + self.room_id + ':', socket.user_id);
    socket.join(self.room_id);
    socket.room_id = self.room_id;

    // attach handlers for messages as defined in Room.messages
    io.bindMessageHandlers.call(self, socket, static_properties.messages);
  };

  RoomSchema.methods.broadcast = function(message_name) {
    console.log(this.room_id, 'broadcasting', arguments);
    var sockets = io.sockets.in(this.room_id);
    sockets.emit.apply(sockets, arguments);
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var Room = mongoose.model('Room', RoomSchema);

  //static properties (defined above)
  _.extend(Room, static_properties);

  Room.setup();

  //listen for incoming socket connections
  io.sockets.on('connection', function(socket) {
    //console.log('A socket with sessionID ' + socket.handshake.sessionID + ' connected!');
    socket.user_id = socket.handshake.session.passport.user;

    var room_id = socket.handshake.room_id //socket.handshake = data object from authorization handler
      , room = Room.getRoom(room_id);
    if (room !== undefined) {
      room.join(socket);
    }
    else {
      console.error('no room with room_id', room_id);
    }
  });

  return Room;
})();