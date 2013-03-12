module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    
    , io = require('../sockets') // configured and listening Socket.IO
    
    , db = require('./db') // make sure mongoose is connected

    , Deck = require('./deck')
    , Player = require('./player');

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
  , MIN_PLAYERS: 2
    // the maximum number of players this came can have
  , MAX_PLAYERS: 10
    // how a Round should handle each stage
    // {String stage_name: Function stage_handler}
  , stage_handlers: {}
    // all the tables in the world (should this be private?)
  , tables: {}
    // how long (in ms) to wait for players to respond to prompts
  , TIMEOUT: 10000
    // how many chips the big blind costs
  , SMALL_BLIND: 10
    // how many chips the small blind costs
  , BIG_BLIND: 20
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var RoundSchema = new Schema({
  // instance properties - document.field_name
    // {seat_num: Player}
    seats            : { type: Schema.Types.Mixed, default: function() { return {}; } }
    // the current stage, an index of Round.STAGES
  , stage_num        : { type: Number, default: 0 }
    // the function this round can call to broadcast to all players in the room
  , broadcast        : Schema.Types.Mixed
    // the seat number of the dealer (determines who posts blinds and who acts first)
  , dealer           : Number
    // the seat number of the small blind (as determined when collecting blinds)
  , small_blind_seat : Number
    // the players that are currently participating in the round, in order of action
  , players          : { type: [Schema.Types.Mixed], default: function() { return []; } }
    // the deck this round uses (created in initialize)
  , deck             : Schema.Types.Mixed
    // the cards that are visible to everyone
  , community        : { type: [String], default: function() { return []; } }
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
      , player
      , handler;

    self.deck = Deck.createDeck({});

    _.each(Round.stage_handlers, function(handler_name, stage_name) {
      handler = self[handler_name];
      self.onStage(stage_name, handler);
    });
  };

  RoundSchema.methods.nextStage = function() {
    if (this.stage_num + 1 >= Round.STAGES.length) {
      console.error('nextStage called when stage_num is', this.stage_num);
      return;
    }
    else {
      this.toStage(this.stage_num + 1);
    }
  };

  RoundSchema.methods.toStage = function(stage) {
    var stage_number = _.indexOf(Round.STAGES, stage);
    if (stage_number === -1) {
      stage_number = stage;
    }
    var stage_name = Round.STAGES[stage_number];
    if (! _.isString(stage_name)) {
      console.error('toStage called with', stage, stage_number, stage_name);
    }
    else {
      this.stage_num = stage_number;
      console.log('emitting stage_' + Round.STAGES[this.stage_num]);
      this.emit('stage_' + Round.STAGES[this.stage_num]);
    }
  };

  RoundSchema.methods.isInStage = function(stage) {
    if (_.isNumber(stage)) {
      return this.stage === stage;
    }
    else if (_.isString(stage)) {
      return Round.STAGES[this.stage] === stage;
    }
    else {
      console.error('isInStage called with', stage);
    }
  };

  RoundSchema.methods.onStage = function(stage, handler) {
    if (! _.isFunction(handler)) {
      console.error('onStage called with non-function', handler);
    }
    else {
      this.on('stage_' + stage, handler);
    }
  };

  RoundSchema.methods.calculatePlayers = function() {
    var self = this
      , player
      , seat_counter
      , first_round = true;
    for (seat_counter = (self.dealer + 1) % Round.MAX_PLAYERS;
         first_round || seat_counter !== ((self.dealer + 1) % Round.MAX_PLAYERS);
         seat_counter = (seat_counter + 1) % Round.MAX_PLAYERS) {
      player = self.seats[seat_counter];
      if (player instanceof Player && player.auto_post_blinds) {
        self.players.push(player);
        if (_.isUndefined(self.small_blind_seat)) {
          self.small_blind_seat = seat_counter;
        }
      }
      first_round = false;
    }
    console.log('calculated players:', self.players, 'small_blind_seat:', self.small_blind_seat);
  }

  RoundSchema.methods.playerBets = function(player, amount) {
    var bet = player.makeBet(amount);

    return bet;
  };

  RoundSchema.methods.playerOut = function(index) {
    var self = this;
    self.players.splice(index, 1);
    /* code from when argument was player
    _.all(self.players, function(p, n) {
      if (player.username === p.username) {
        self.players.splice(n, 1);
        return false; // break out of loop
      }
      return true; // continue loop
    });*/
  };

  static_properties.stage_handlers.blinding = 'collectBlinds';
  RoundSchema.methods.collectBlinds = function() {
    var self = this
      , index = 0
      , SMALL_BLIND_PAID = false
      , BIG_BLIND_PAID = false;

    self.calculatePlayers();
    while(SMALL_BLIND_PAID === false && self.players.length >= Round.MIN_PLAYERS) {
      player = self.players[index];
      //console.log('index is', index, 'player is', player, 'players is', self.players);
      var bet = self.playerBets(player, Round.SMALL_BLIND);
      if (bet < Round.SMALL_BLIND) {
        console.error('Player does not have enough chips to pay small blind!');
        self.playerOut(index);
        player.returnBet();
      }
      else {
        self.broadcast('player_acts', index, 'post_blind', Round.SMALL_BLIND);
        SMALL_BLIND_PAID = true;
        index++;
      }
    }

    while(SMALL_BLIND_PAID && BIG_BLIND_PAID === false && self.players.length >= Round.MIN_PLAYERS) {
      player = self.players[index];
      var bet = self.playerBets(player, Round.BIG_BLIND);
      if (bet < Round.BIG_BLIND) {
        console.error('Player does not have enough chips to pay big blind!');
        self.playerOut(index);
      }
      else {
        self.broadcast('player_acts', index, 'post_blind', Round.BIG_BLIND);
        BIG_BLIND_PAID = true;
        index++;
      }
    }

    if (SMALL_BLIND_PAID && BIG_BLIND_PAID) {
      self.nextStage();
    }
    else {
      console.log('Round not completed!', SMALL_BLIND_PAID, BIG_BLIND_PAID, self.players);
      self.toStage('done');
    }

    /*if (! player.blind_paid) {
      player.prompt(['post_blind', 'sit_out'], Round.TIMEOUT, function(action, num_chips) {
        console.log('Player.prompt returns', action, num_chips);
        self.nextStage();
      });
    }*/
  };

  static_properties.stage_handlers.dealing = 'dealHands';
  RoundSchema.methods.dealHands = function() {
    var self = this
      , first_card
      , second_card;
    _.each(self.players, function(player) {
      first_card = self.deck.deal();
      second_card = self.deck.deal();
      player.receiveHand(first_card, second_card);
      player.sendMessage('hand_dealt', player.hand);
    });
    this.broadcast('cards_dealt', this.community);
    this.nextStage();
  };

  static_properties.stage_handlers.betting = 'bettingRound';
  RoundSchema.methods.bettingRound = function() {
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

  static_properties.stage_handlers.done = 'cleanup';
  RoundSchema.methods.cleanup = function() {
    var self = this;
    if (self.players.length > 1) {
      console.error('More than one player in players during cleanup!', self.players);
    }
    _.each(self.players, function(player) {
      player.returnBet();
      player.returnHand();
    });
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