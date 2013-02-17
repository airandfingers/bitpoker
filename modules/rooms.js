module.exports = (function () {
  var Class = require('node-class').Class;

  var rooms = {}
    , Room = Class('Room', {
      id: null
  });
  Room.implements({
    __construct: function(obj) {
      //console.log('constructor called!', obj);
      rooms[this.id] = this;
    }
  , join: function(user) {
      console.log('User wants to join ' + this.id + ':', user);
    }
  });

  new Room({
    id: 'lobby'
  });

  return {
    Room: Room
  , getRoom: function(room_id) {
      //console.log('getting', room_id);
      var room = rooms[room_id];
      return room;
    }
  }
})();