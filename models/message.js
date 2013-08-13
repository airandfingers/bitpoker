module.exports = (function() {
  var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

  , async = require('async')
  , request = require('request')
  , _ = require('underscore')

  , db = require('./db');

//Create Message Mongoose model:
//Define MessageSchema (game_id, type, message, timestamp?)
var MessageSchema = new Schema ({
  game_id
  , type
  , message
  , timestamp : { type: Date, default: Date.now }  
});

//Write Message.createMessage(spec) static function
MessageSchema.statics.createMessage = function(spec, cb) {

};

//Write Message.getMessagesByGameId static function(game_id)
MessageSchema.statics.getMessagesByGameId = function(game_id, cb) {

};

//Write Message.deleteMessagesWithGameId static function(game_id)?
MessageSchema.statics.deleteMessagesWithGameId = function (game_id, cb) {

};

//Write Room.broadcastAndSave(game_id) static function:
//Shift and store first argument (game_id)
//Call Room.broadcast with remaining arguments
//Call Message.createMessage
//Call message.save

//Table.getTableState:
//Call Message.getMessagesByGameId to retrieve messages for current game
//Add messages field to table_state object

//HandHistory:
//HandHistory.appendToHistoryString: call broadcastAndSave instead of broadcast

})();