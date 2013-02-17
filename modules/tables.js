module.exports = (function () {
  var Class = require('node-class').Class
    , rooms = require('./rooms')
    , Room = rooms.Room;

  var NUM_TABLES = 2
    , TABLE_PREFIX = 'table_';

  var Table = Class('Table', {});

  Table.extends(Room, false);

  Table.implements({
    join: function(user) {
      console.log('User wants to join table', this.id, user);
    }
  })

  for (var i = 1; i <= NUM_TABLES; i++) {
    //console.log('creating', i);
    new Table({
      id: TABLE_PREFIX + i
    });
  }

  return {
    Table: Table
  , getTable: function(table_id) {
      //console.log('getting', table_id);
      return rooms.getRoom(TABLE_PREFIX + table_id);
    }
  }
})();