(function(exports) {
  var db_config = require('./db.config') //connection information for users-db
    , mongoose = require('mongoose') //MongoDB abstraction layer
    , express = require('express')
    , MongooseStore = require('session-mongoose')(express); //used as our session store

  mongoose.connect(
    'mongodb://' + db_config.DB_HOST +
    ':' + db_config.DB_PORT +
    '/' + db_config.DB_NAME,
    { user: db_config.DB_USER, pass: db_config.DB_PASSWORD }
  );
  mongoose.connection.on('error', function(err) { console.error(err); });
  
  exports.session_store = new MongooseStore({
    connection: mongoose.connection
  }, function onConnect() {
    exports.session_store.connected = true;
  });

  exports.TEST_USERNAME = db_config.TEST_USERNAME;
  exports.TEST_PASSWORD = db_config.TEST_PASSWORD;
  exports.SESSION_SECRET = db_config.SESSION_SECRET;
})(module.exports = {});