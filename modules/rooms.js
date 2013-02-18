module.exports = (function () {
  var $ = require('node-class')
    , io;
  
  /*Extend built-in types with the following methods:
  RegExp.escape       - RegExpEscape; // escape the string so it can be used inside a regex as literal
  Object.merge        - ObjectMerge; // merge two objects, modify the first argument!!!
  Object.mergecloning - ObjectMergeCloning; //merge and clone
  Object.each         - ObjectEach; // for in
  Array.ize           - ArrayIze; // create an array given any arg
  Array.clone         - ArrayClone; //clone an array
  Array.append        - ArrayAppend; //append ar2 to ar, return a cloned one
  Array.insertAt      - ArrayInsertAt; // insert in given position
  */
  $.populateTypes();

  var Room = $.Class('Room', {
      //instance properties
      id: null
    , sockets: null
  });

  Room.extends($.Events, true);

  Room.implements({
    //instance methods
    __construct: function(obj) {
      var self = this;
      console.log('Room constructor called!', obj);
      self.parent();
      Room.rooms[self.id] = self;
      $.ObjectEach(Room.events, function(function_name, event_name) {
        self.on(event_name, function() {
          //console.log(event_name + ' event triggered on ' + self.id + ' with ', arguments);
          self[function_name].apply(self, arguments);
        });
      });
    }
  , join: function(socket) {
      var self = this;
      //console.log('Socket joining ' + self.id + ':', socket.user_id);
      socket.join(self.id);
      socket.room_id = self.id;

      $.ObjectEach(Room.messages, function(function_name, message_name) {
        socket.on(message_name, function() {
          //console.log(message_name + ' message sent to ' + self.id +
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
    }
  , broadcast: function(message_name) {
      io = io ||  require('./sockets');
      console.log(this.id, 'broadcasting message', arguments);
      this.sockets = io.sockets.in(this.id)
      this.sockets.emit.apply(this.sockets, arguments);
    }
  });

  Object.merge(Room, {
    //class properties
    ROOMS: ['lobby']
  , rooms: {}
  , events: {
    join: 'join'
  }
  , messages: {
    chatMessage: 'broadcast'
  }
  });

  Room.static({
    //class methods
    setup: function() {
      Room.ROOMS.forEach(function(room_id, i, ROOMS) {
        //console.log('creating', room_id, i, ROOMS);
        var room = new Room({
          id: room_id
        });
      });
    }
  , getRoom: function(room_id) {
      //console.log('getting', room_id);
      return Room.rooms[room_id];
    }
  });

  Room.setup();

  return Room;
})();