module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    , async = require('async') // sync/async control flow library
    
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
    , 'betting_preflop'
    , 'flopping'
    , 'betting_postflop'
    , 'turning'
    , 'betting_preriver'
    , 'rivering'
    , 'betting_postriver'
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
    // the seat number of the dealer (use to calculate order-adjusted players)
  , dealer           : Number
    // the seat number of the small blind (as determined when collecting blinds)
  , small_blind_seat : Number
    // the players that are currently participating in the round, in order of action
  , players          : { type: [Schema.Types.Mixed], default: function() { return []; } }
    // the index (within this.players) of the next player to act
  , to_act           : { type: Number, default: 0 }
    // the highest bet so far in this betting round
  , high_bet         : Number
    // the number of chips in the pot (matched by all active players)
  , pot              : { type: Number, default: 0 }
    // the index (within this.players) of the winning player
  , winner           : Number
    // the deck this round uses (created in initialize)
  , deck             : Schema.Types.Mixed
    // the cards that are visible to everyone
  , community        : { type: [String], default: function() { return []; } }
    // unique identifier for this Round
  , round_id         : String
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

    _.each(Round.stage_handlers, function(handler, stage_name) {
      /* from when stage_handers were names of instance methods
      handler = self[handler_name];*/
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
    var stage_num = _.indexOf(Round.STAGES, stage);
    if (stage_num === -1) {
      stage_num = stage;
    }
    var stage_name = Round.STAGES[stage_num];
    if (! _.isString(stage_name)) {
      console.error('toStage called with', stage, stage_num, stage_name);
    }
    else {
      this.stage_num = stage_num;
      console.log('*Stage: ' + stage_name + '*');
      this.emit('stage_' + stage_name);
    }
  };

  RoundSchema.methods.isInStage = function(stage) {
    if (_.isNumber(stage)) {
      return this.stage_num === stage;
    }
    else if (_.isString(stage)) {
      return Round.STAGES[this.stage_num] === stage;
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
  };

  RoundSchema.methods.calculatePot = function() {
    var bets = 0;
    _.each(this.players, function(player) {
      bets += player.current_bet;
    });
    return this.pot + bets;
  };

  RoundSchema.methods.takeBets = function() {
    var self = this
      , bet;
    _.each(self.players, function(player) {
      bet = player.giveBet();
      console.log('got bet from player:', bet);
      self.pot += bet;
    });
  };

  RoundSchema.methods.currentPlayer = function() {
    return this.players[this.to_act];
  };

  RoundSchema.methods.nextPlayer = function() {
    this.to_act++;
    if (this.to_act >= this.players.length) {
      this.to_act = 0;
    }
    console.log('nextPlayer:', this.to_act, this.players[this.to_act]);
    return this.players[this.to_act];
  };

  RoundSchema.methods.playerOut = function(index) {
    var player = this.players[index]
      , bet = player.giveBet();
    console.log('got bet from player:', bet);
    this.pot += bet;
    player.roundOver();
    this.players.splice(index, 1);
    if (this.to_act >= index) {
      this.to_act--;
    }
  };

  static_properties.stage_handlers.blinding = function() {
    var self = this
      , SMALL_BLIND_PAID = false
      , BIG_BLIND_PAID = false
      , bet
      , player;

    self.calculatePlayers();
    while (SMALL_BLIND_PAID === false && 
           self.players.length >= Round.MIN_PLAYERS) {
      player = self.players[this.to_act];
      //console.log('this.to_act is', this.to_act, 'player is', player, 'players is', self.players);
      bet = player.makeBet(Round.SMALL_BLIND);
      if (bet < Round.SMALL_BLIND) {
        console.error('Player does not have enough chips to pay small blind!');
        self.playerOut(self.to_act);
        player.returnBet();
      }
      else {
        self.broadcast('player_acts', player.toObject(), 'post_blind', self.calculatePot());
        SMALL_BLIND_PAID = true;
      }
      self.nextPlayer();
    }

    while (SMALL_BLIND_PAID &&
           BIG_BLIND_PAID === false &&
           self.players.length >= Round.MIN_PLAYERS) {
      player = self.players[this.to_act];
      //console.log('this.to_act is', this.to_act, 'player is', player, 'players is', self.players);
      bet = player.makeBet(Round.BIG_BLIND);
      if (bet < Round.BIG_BLIND) {
        console.error('Player does not have enough chips to pay big blind!');
        self.playerOut(self.to_act);
      }
      else {
        self.broadcast('player_acts', player.toObject(), 'post_blind', self.calculatePot());
        BIG_BLIND_PAID = true;
      }
      self.nextPlayer();
    }

    if (SMALL_BLIND_PAID && BIG_BLIND_PAID) {
      self.high_bet = Round.BIG_BLIND;
      self.nextStage();
    }
    else {
      console.log('Blinds not paid!', SMALL_BLIND_PAID, BIG_BLIND_PAID, self.players);
      self.toStage('done');
    }

    /*if (! player.blind_paid) {
      player.prompt(['post_blind', 'sit_out'], Round.TIMEOUT, function(action, num_chips) {
        console.log('Player.prompt returns', action, num_chips);
        self.nextStage();
      });
    }*/
  };

  static_properties.stage_handlers.dealing = function() {
    var self = this
      , first_card
      , second_card;
    _.each(self.players, function(player) {
      first_card = self.deck.deal();
      second_card = self.deck.deal();
      player.receiveHand(first_card, second_card);
      player.sendMessage('hole_cards_dealt', player.hand);
    });
    this.broadcast('hands_dealt', this.players);
    this.nextStage();
  };

  static_properties.stage_handlers.betting_preflop   =
  static_properties.stage_handlers.betting_postflop  =
  static_properties.stage_handlers.betting_preriver  =
  static_properties.stage_handlers.betting_postriver = function() {
    var self = this
      , player = self.currentPlayer()
      , min_bet
      , last_raise = Round.BIG_BLIND
      , max_raise
      , actions
      , default_action;

    console.log(self.stage_num, self.isInStage('betting_preflop'));
    if (! self.isInStage('betting_preflop')) {
      self.high_bet = 0;
      self.to_act = 0;
    }

    async.whilst(
      function() { // test
        console.log('testing:',
                      '# of players: ' + self.players.length + ' vs. MIN_PLAYERS: ' + Round.MIN_PLAYERS,
                      'Has player acted yet? ' + player.hasActedIn(self.stage_num),
                      'current_bet: ' + player.current_bet + ' vs. high_bet: ' + self.high_bet);
        return self.players.length >= Round.MIN_PLAYERS &&
               ((! player.hasActedIn(self.stage_num)) || player.current_bet < self.high_bet);
      },
      function(cb) { // loop body
        min_bet = self.high_bet - player.current_bet;
        max_raise = player.chips - min_bet;
        actions = [{ fold: null }];
        default_action = 'fold';
        if (min_bet > 0) { actions.push({ call: min_bet }); }
        else { actions.push({ check: null }); default_action = 'check'; }
        if (max_raise > 0) { actions.push({ raise: [last_raise, max_raise] } ); }
        console.log('Prompting', player.username, actions, Round.TIMEOUT, default_action);
        player.prompt(actions, Round.TIMEOUT, default_action, function(action, num_chips) {
          console.log(player.username, 'acted!', action, num_chips);
          if (! _.any(actions, function(action_obj) { return (action_obj[action] !== undefined); })) {
            console.log('Player chose invalid action', action, ', so treating it as', default_action);
            action = default_action;
          }
          switch(action) {
          case 'check':
            break;
          case 'call':
            if (num_chips !== min_bet) {
              console.error('Player tried to call with a value other than min_bet!', num_chips, min_bet);
            }
            player.makeBet(min_bet);
            break;
          case 'raise':
            if (num_chips < last_raise) {
              console.error('Player raised with less than last_raise!', num_chips, last_raise);
            }
            else if (num_chips > max_raise) {
              console.error('Player raised with more than max_raise!', num_chips, max_raise);
            }
            self.high_bet += num_chips - min_bet;
            player.makeBet(num_chips);
            last_raise = num_chips;
            break;
          case 'fold':
            self.playerOut(self.to_act);
            break;
          }
          self.broadcast('player_acts', player.toObject(), action, self.calculatePot());
          player.actedIn(self.stage_num);
          player = self.nextPlayer();
          cb();
        });
      },
      function() { // done
        if (self.players.length >= Round.MIN_PLAYERS) {
          console.log('Betting round completed!', self.pot, self.players);
          self.takeBets();
          self.nextStage();
        }
        else {
          console.log('Not enough players to continue to next stage!', self.players);
          self.winner = 0;
          self.toStage('paying_out');
        }
      }
    );
  };

  static_properties.stage_handlers.flopping = function() {
    this.community.push(this.deck.deal(), this.deck.deal(), this.deck.deal());
    this.broadcast('community_dealt', this.community, this.players);
    this.nextStage();
  };

  static_properties.stage_handlers.turning = function() {
    this.community.push(this.deck.deal());
    this.broadcast('community_dealt', this.community, this.players);
    this.nextStage();
  };

  static_properties.stage_handlers.rivering = function() {
    this.community.push(this.deck.deal());
    this.broadcast('community_dealt', this.community, this.players);
    this.nextStage();
  };

  static_properties.stage_handlers.showing_down = function() {
    var self = this;
    console.log('Choosing the first-to-act player as the "winner"!');
    _.each(self.players, function(player, index) {
      if (_.isUndefined(self.winner)) {
        self.winner = index;
      }
      else {
        self.playerOut(index);
      }
    });
    self.nextStage();
  };

  static_properties.stage_handlers.paying_out = function() {
    var winning_player = this.players[this.winner];
    if (! winning_player instanceof Player) {
      console.error('payout called when this.winner is ', this.winner, '!', winning_player);
      return;
    }
    console.log(this.winner, 'wins!', winning_player, this.pot);
    winning_player.win(this.pot);
    var winning_player_obj = winning_player.toObject(true);
    this.broadcast('round_ends', [winning_player_obj], this.pot)
    this.nextStage();
  };

  static_properties.stage_handlers.done = function() {
    var self = this
      , num_players = self.players.length;
    if (num_players > Round.MIN_PLAYERS) {
      console.error(num_players + ' players in at cleanup!', self.players);
    }
    console.log('Round over! Notifying players...');
    _.each(self.players, function(player) {
      player.roundOver();
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