module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db'); // make sure mongoose is connected

  var static_properties = {
  // static properties (attached below) - Model.property_name
    // the stages this round can be in, in order
    STAGES: [
      'waiting'
    , 'blinding'
    , 'dealing'
    , 'betting'
    , 'flopping'
    , 'betting'
    , 'turning'
    , 'betting'
    , 'rivering'
    , 'betting'
    , 'showing_down'
    , 'paying_out'
    , 'done'
    ]
    // the number of tables to initialize in setup
  , NUM_TABLES: 2
    // the number of players who need to be sitting/blinding before round can begin
  , MIN_PLAYERS: 1
    // how a Round should handle each stage
    // {String stage_name: Function stage_handler}
  , stage_handlers: {}
    // all the tables in the world (should this be private?)
  , tables: {}
    // how long (in ms) to wait for players to respond to prompts
  , TIMEOUT: 10000
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var RoundSchema = new Schema({
  // instance properties - document.field_name
    // {seat_num: Player}
    seats     : { type: Schema.Types.Mixed, default: {} }
    // current stage
  , stage     : { type: Number, default: 0 }
    // the function this round can call to broadcast to all players in the room
  , broadcast : Schema.Types.Mixed
    // the seat number of the dealer (determines who posts blinds and who acts first)
  , dealer    : Number
  });

  // static methods - Model.method()
  RoundSchema.statics.createRound = function(spec) {
    /* our "constructor" function. Usage: Round.createRound({prop: 'val'})
       (see Schema definition for list of properties)*/
    console.log('Round.createRound called!', spec);
    var round = new Round(spec);
    round.initialize();

    return round;
  };

  // instance methods - document.method()
  RoundSchema.methods.initialize = function() {
    var self = this
      , handler;
    _.each(Round.stage_handlers, function(handler_name, stage_name) {
      handler = self[handler_name];
      self.onStage(stage_name, handler);
    });
  };

  RoundSchema.methods.nextStage = function() {
    if (this.stage + 1 >= Round.STAGES.length) {
      console.error('nextStage called when stage is', this.stage );
      return;
    }
    else {
      this.stage++;
    }
    console.log('emitting stage_' + Round.STAGES[this.stage]);
    this.emit('stage_' + Round.STAGES[this.stage]);
  };

  RoundSchema.methods.isInStage = function(stage) {
    return this.stage === stage || Round.STAGES[this.stage] === stage;
  };

  RoundSchema.methods.onStage = function(stage, handler) {
    if (! _.isFunction(handler)) {
      console.error('onStage called with non-function', handler);
    }
    else {
      this.on('stage_' + stage, handler);
    }
  };

  static_properties.stage_handlers.blinding = 'takeBlinds';
  RoundSchema.methods.takeBlinds = function() {
    var self = this;
    _.each(self.seats, function(player, seat_num) {
      if (! player.blind_paid) {
        player.prompt(['post_blind', 'sit_out'], Round.TIMEOUT, function(action, num_chips) {
          console.log('Player.prompt returns', action, num_chips);
        });
      }
    });
    self.nextStage();
  };

  static_properties.stage_handlers.dealing = 'dealHands';
  RoundSchema.methods.dealHands = function() {
    this.nextStage();
  };

  static_properties.stage_handlers.betting = 'takeBets';
  RoundSchema.methods.takeBets = function() {
    this.nextStage();
  };

  static_properties.stage_handlers.flopping = 'flop';
  RoundSchema.methods.flop = function() {
    this.nextStage();
  };

  static_properties.stage_handlers.turning = 'turn';
  RoundSchema.methods.turn = function() {
    this.nextStage();
  };

  static_properties.stage_handlers.rivering = 'river';
  RoundSchema.methods.river = function() {
    this.nextStage();
  };

  static_properties.stage_handlers.showing_down = 'showdown';
  RoundSchema.methods.showdown = function() {
    this.nextStage();
  };

  static_properties.stage_handlers.paying_out = 'payout';
  RoundSchema.methods.payout = function() {
    this.nextStage();
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var Round = mongoose.model('Round', RoundSchema);

  //static properties (defined above)
  _.extend(Round, static_properties);

  return Round;
})();