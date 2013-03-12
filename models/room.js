module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure db is connected

    , User = require('./user')

    /* the schema - defines the "shape" of the documents:
     *   gets compiled into one or more models */
    , RoomSchema = new Schema({
    // instance properties
      // this room's name and location
      room_id : String 
      // handlers to call when a socket joins this room
    , joinHandlers : { type: [], default: function() { return []; } }
    });

  var static_properties = {
  // static properties (attached below) - Model.property_name
    // list of rooms to be created in Room.setup
    ROOMS: ['lobby']
    // existing rooms, { room_id: room_document }
  , rooms: {}
    // the messages a Table should react to, on each player's socket
    // {String message_name: {handler: Function, pass_socket: Boolean, pass_message_name: Boolean}}
  , messages: {
      chatMessage: { handler: 'broadcast', pass_message_name: true }
    , fold: 'broadcast'
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
    var self = this
      , user_id = socket.handshake.session.passport.user;
    User.findById(user_id, 'username', function(err, user) {
      if (err) { console.error(err); }
      else if (! user) {
        console.error( 'No user found with id', user_id, '!' );
      }
      else {
        socket.user = user;
        // notify anyone interested (the corresponding table)
        self.emit('socket_join', socket);
        self.broadcast('user_joins', user);
      }
    });
    //console.log('Socket joining ' + self.room_id + ':', socket.user_id);
    socket.join(self.room_id);
    socket.room_id = self.room_id;

    // attach handlers for messages as defined in Room.messages
    io.bindMessageHandlers.call(self, socket, static_properties.messages);
  };

  RoomSchema.methods.leave = function(socket) {
    // notify anyone interested (the corresponding table)
    this.emit('socket_leave', socket);
    this.broadcast('user_leaves', socket.user);
  };

  RoomSchema.methods.setJoinHandler = function(handler) {
    if (! _.isFunction(handler)) {
      console.error('setJoinHandler called with', handler);
    }
    else {
      this.joinHandlers.push(handler);
    }
  };

  RoomSchema.methods.broadcast = function(message_name) {
    console.log(this.room_id, 'broadcasting', arguments);
    var socket_list = io.sockets.in(this.room_id);
    socket_list.emit.apply(socket_list, arguments);
  };

  RoomSchema.methods.getUsers = function() {
    var sockets = io.sockets.clients(this.room_id)
      , users = _.pluck(sockets, 'user');
    return users;
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var Room = mongoose.model('Room', RoomSchema);

  //static properties (defined above)
  _.extend(Room, static_properties);

  Room.setup();

  // listen for incoming socket connections
  io.sockets.on('connection', function(socket) {
    //console.log('A socket with sessionID ' + socket.handshake.sessionID + ' connected!');

    // override emit method to log, then emit
    var emit = socket.emit;
    socket.emit = function() {
      var args = Array.prototype.slice.call(arguments)
        , user = socket.user || {};
      if (args[0] !== 'newListener') {
        console.log('Sending to ' + user.username + ':', args);
        emit.apply(socket, arguments);
      }
    };

    // override on method (called $emit) to log, then on
    var $emit = socket.$emit;
    socket.$emit = function() {
      var args = Array.prototype.slice.call(arguments)
        , user = socket.user || {};
      if (args[0] !== 'newListener') {
        console.log(user.username + ' sent:', args);
        $emit.apply(socket, arguments);
      }
    };

    var room_id = socket.handshake.room_id //socket.handshake = data object from authorization handler
      , room = Room.getRoom(room_id);
    if (room !== undefined) {
      room.join(socket);
    }
    else {
      console.error('no room with room_id', room_id);
    }

    socket.on('disconnect', function() {
      room.leave(socket);
    });
  });

  return Room;
})();