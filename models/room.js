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
      chat: { handler: 'broadcastChatMessage', pass_socket: true }
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
    if (! _.isUndefined(user_id)) {
      User.findById(user_id, 'username', function(err, user) {
        if (err) { console.error(err); }
        else if (! user) {
          console.error( 'No user found with id', user_id, '!' );
          user = {};
        }
        //else {
        socket.user = user;
        // notify all users, including this one
        socket.emitToOthers('user_joins', user, false);
        socket.emit('user_joins', user, true);
        // notify any interested server-side objects (the corresponding table)
        self.emit('socket_join', socket);
        //}
      });
    }
    else {
      // unauthenticated socket joining
      var user = {};
      socket.user = user;
      // notify all users, including this one
      socket.emitToOthers('user_joins', user, false);
      socket.emit('user_joins', user, true);
      // notify any interested server-side objects (the corresponding table)
      self.emit('socket_join', socket);
    }
    //console.log('Socket joining ' + self.room_id + ':', socket.user_id);
    socket.join(self.room_id);
    socket.room_id = self.room_id;

    // attach handlers for messages as defined in Room.messages
    io.bindMessageHandlers.call(self, socket, static_properties.messages);
  };

  RoomSchema.methods.leave = function(socket) {
    // notify anyone interested (the corresponding table)
    this.emit('socket_leave', socket);
    socket.emitToOthers('user_leaves', socket.user, false);
    socket.emit('user_leaves', socket.user, true);
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

  RoomSchema.methods.broadcastChatMessage = function(socket, chat_obj) {
    var username = socket.user && socket.user.username || 'Guest'
      , seat_num = socket.player && socket.player.seat;
    if (username !== chat_obj.sender) {
      console.error(username, 'tried to send a message as', chat_obj.sender);
      chat_obj.sender = username;
    }
    if (_.isNumber(seat_num)) { chat_obj.seat = seat_num; }
    this.broadcast('user_chats', chat_obj);
  };

  RoomSchema.methods.getUsernames = function() {
    var sockets = _.compact(io.sockets.clients(this.room_id))
      , users = _.compact(_.pluck(sockets, 'user'))
      , usernames = _.compact(_.pluck(users, 'username'));
    return usernames;
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
      var args_array = _.toArray(arguments)
        , user = socket.user || {};
      if (args_array[0] !== 'newListener') {
        console.log('Sending to ' + user.username + ':', args_array);
        emit.apply(socket, arguments);
      }
    };

    // override message-received trigger (called $emit) to log, then trigger
    var $emit = socket.$emit;
    socket.$emit = function() {
      var args_array = _.toArray(arguments)
        , user = socket.user || {};
      if (args_array[0] !== 'newListener') {
        console.log('(room) ' + user.username + ' sent:', args_array);
        $emit.apply(socket, arguments);
      }
    };

    socket.emitToOthers = function() {
      var args_array = _.toArray(arguments);
      _.each(io.sockets.clients(room_id), function(_socket) {
        if (_socket.id !== socket.id) {
          _socket.emit.apply(_socket, args_array);
        }
      });
    }

    var room_id = socket.handshake.room_id //socket.handshake = data object from authorization handler
      , room = Room.getRoom(room_id);
    if (room !== undefined) {
      room.join(socket);
      socket.on('disconnect', function() {
        room.leave(socket);
      });
    }
    else {
      console.error('no room with room_id', room_id);
    }
  });

  return Room;
})();