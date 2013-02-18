module.exports = (function () {
  var $ = require('node-class');
  
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
  });

  Room.implements({
    //instance methods
    __construct: function(obj) {
      //console.log('constructor called!', obj);
      Room.rooms[this.id] = this;
    }
  , join: function(user) {
      console.log('User wants to join ' + this.id + ':', user);
    }
  })

  Object.merge(Room, {
    //class properties
    ROOMS: ['lobby']
  , rooms: {}
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