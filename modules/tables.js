module.exports = (function () {
  var $ = require('node-class')
    , Room = require('./rooms');
  
  //See rooms.js
  //$.populateTypes();

  var Table = $.Class('Table', {/*instance properties*/}, {
    //instance methods
    /*join: function(user) {
      console.log('User wants to join ', this.id, user);
    }*/
  });

  Table.extends(Room, false);

  Object.merge(Table, {
    //class properties
    NUM_TABLES: 2
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