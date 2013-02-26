/* This is a template for defining a class
   as a Mongoose Schema and Model. */
module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure mongoose is connected

    /* the schema - defines the "shape" of the documents:
     *   gets compiled into one or more models */
    , DeckSchema = new Schema({
    // instance properties
      // this room's name and location
      room_id : String 
    });

  var static_properties = {
  // static properties (attached below) - Model.property_name
    // message-to-handler map, { message_name: instance_method_name }
    messages: {
      chatMessage: { handler: 'broadcast', pass_message_name: true }
    }
  };

  // static methods - Model.method()
  DeckSchema.statics.setup = function() {
    // set up static variables
    // and define any instances that should exist from the start
  };

  DeckSchema.statics.createDeck = function(spec) {
    /* our "constructor" function. Usage: Deck.createDeck({prop: 'val'})
       (see Schema definition for list of properties)*/
    console.log('Deck.createDeck called!');
    var deck = new Deck(spec);
    return deck;
  };

  // instance methods - document.method()
  DeckSchema.methods.join = function(socket) {
    var self = this;
    console.log('Socket joining ' + self.room_id + ':', socket.user_id);
    socket.join(self.room_id);

    io.bindMessageHandlers.call(self, socket, static_properties.messages);
  };

  DeckSchema.methods.broadcast = function(message_name) {
    console.log(this.room_id, 'broadcasting message', arguments);
    var sockets = io.sockets.in(this.room_id);
    sockets.emit.apply(sockets, arguments);
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var Deck = mongoose.model('Deck', DeckSchema);

  //static properties (defined above)
  _.extend(Deck, static_properties);

  Deck.setup();
  
  return Deck;
})();