module.exports = (function () {
  var $ = require('node-class')
    , Room = require('./rooms');
  
  //See rooms.js
  //$.populateTypes();

  var STATUSES = {
    INITIALIZING: 'initializing'
  , WAITING: 'waiting'
  , GAME_IN_PROGRESS: 'game_in_progress'
  , CLOSING: 'closing'
  }
    , Table = $.Class('Table', {
    //instance properties
    players: []
  , seats: {}
  , status: STATUSES.INITIALIZING
  , 
  });

  Table.extends(Room, false);

  Table.implements({
    //instance methods
    __construct: function(obj) {
      console.log('Table constructor called!', obj);
      this.parent();
      Room.rooms[this.id] = this;
    }
  /*, join: function(user) {
      console.log('User wants to join ' + this.id + ':', user);
    }*/
  });

  Object.merge(Table, {
    //class properties
    STATUSES: STATUSES
  , NUM_TABLES: 2
  , TABLE_PREFIX: 'table_'
  });

  Table.static({
    //class methods
    setup: function() {
      for (var i = 1; i <= Table.NUM_TABLES; i++) {
        //console.log('creating', i);
        new Table({
          id: Table.TABLE_PREFIX + i
        });
      }
    }
  , getTable: function(table_id) {
      //console.log('getting', table_id);
      return Room.getRoom(Table.TABLE_PREFIX + table_id);
    }
  , 
  });

  Table.setup();

  return Table;
})();