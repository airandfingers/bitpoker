module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    , async = require('async') // sync/async control flow library
    
    , io = require('../sockets') // configured and listening Socket.IO

    , PokerEvaluator = require('poker-evaluator')
    , evaluator = new PokerEvaluator('./node_modules/poker-evaluator/HandRanks.dat')
    
    , db = require('./db') // make sure mongoose is connected

    , Deck = require('./deck')
    , Player = require('./player');

  var static_properties = {
  // static properties (attached below) - Model.property_name
    // the stages this round can be in, in order
    STAGES: [
      'initializing'
    , 'shuffling'
    , 'waiting'
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
    // how many chips the big blind costs
  , SMALL_BLIND: 10
    // how many chips the small blind costs
  , BIG_BLIND: 20
    // how long (in ms) to wait for players to respond to prompts
  , TIMEOUT: 10000
    // how long (in ms) to wait for players to respond to prompts
  , DISPLAY_HANDS_DURATION: 5000
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
      self.onStage(stage_name, handler);
    });

    self.nextStage();
  };

  static_properties.stage_handlers.shuffling = function() {
    var self = this;
    self.deck.shuffle(function onShuffled() {
      self.nextStage();
    });
  };

  RoundSchema.methods.go = function() {
    if (! this.isInStage('waiting')) {
      console.error('go called with this.stage_num is', this.stage_num, ':', Round.STAGES[this.stage_num]);
      return;
    }
    this.nextStage();
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
        self.broadcast('player_acts', player.serialize(), 'post_blind', self.calculatePot());
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
        self.broadcast('player_acts', player.serialize(), 'post_blind', self.calculatePot());
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
  };

  static_properties.stage_handlers.dealing = function() {
    var self = this
      , first_card
      , second_card
      , player_objs = _.map(self.players, function(player) { return player.serialize(); });
    _.each(self.players, function(player) {
      first_card = self.deck.deal();
      second_card = self.deck.deal();
      player.receiveHand(first_card, second_card);
      player.sendMessage('hole_cards_dealt', player.hand);
    });
    this.broadcast('hands_dealt', player_objs);
    this.nextStage();
  };

  static_properties.stage_handlers.betting_preflop   =
  static_properties.stage_handlers.betting_postflop  =
  static_properties.stage_handlers.betting_preriver  =
  static_properties.stage_handlers.betting_postriver = function() {
    // reset high_bet and to_act values
    if (! this.isInStage('betting_preflop')) {
      //console.log('Not in betting_preflop, so resetting high_bet and to_act');
      this.high_bet = 0;
      this.to_act = this.first_to_act;
    }

    var self = this
      , player = self.currentPlayer()
      , to_call
      , last_raise = Round.BIG_BLIND
      , min_bet
      , max_bet
      , actions
      , default_action
      , default_action_obj
      , bet_action
      , bet_action_obj;

    async.whilst(
      function shouldRunBody() { // test
        console.log('testing:',
                      '# of players: ' + self.players.length + ' vs. MIN_PLAYERS: ' + Round.MIN_PLAYERS,
                      'Has player acted yet? ' + player.hasActedIn(self.stage_num),
                      'current_bet: ' + player.current_bet + ' vs. high_bet: ' + self.high_bet);
        return self.players.length >= Round.MIN_PLAYERS &&
               ((! player.hasActedIn(self.stage_num)) || player.current_bet < self.high_bet);
      },
      function loopBody(cb) {
        // handle "no chips" condition
        if (player.chips === 0) {
          player.actedIn(self.stage_num);
          player = self.nextPlayer();
          return cb();
        }
        // calculate/set actions and default_action to be used in prompt
        actions = [];
        to_call = self.high_bet - player.current_bet;
        // fold/check
        default_action = to_call > 0 ? 'fold' : 'check';
        default_action_obj = {};
        default_action_obj[default_action] = true;
        actions.push(default_action_obj);
        // raise/bet
        min_bet = to_call + last_raise;
        max_bet = player.chips;
        //console.log('high_bet', self.high_bet, 'to_call', to_call, 'min_bet', min_bet, 'max_bet', max_bet);
        
        if (max_bet < min_bet) {
          // player can't afford to raise at minimum raise level
          min_bet = max_bet;
        }
        if (max_bet > to_call) {
          bet_action = self.high_bet > 0 ? 'raise' : 'bet';
          bet_action_obj = {};
          bet_action_obj[bet_action] = [min_bet, max_bet];
          actions.push(bet_action_obj);
        }
        // call
        if (max_bet < to_call) {
          // player can't afford to call
          actions.push({ call: player.chips });
        }
        else if (to_call > 0) {
          // player must pay to_call or fold
          actions.push({ call: to_call });
        }

        player.prompt(actions, Round.TIMEOUT, default_action, function(action_choice, num_chips_choice) {
          if (_.all(actions, function(action_obj) { return (action_obj[action_choice] === undefined); })) {
            console.error('Player chose invalid action', action_choice, ', so treating it as', default_action);
            action_choice = default_action; // act as if the player timed out (in less than Round.TIMEOUT)
            num_chips = undefined;
          }
          performAction(action_choice, num_chips_choice);
          self.broadcast('player_acts', player.serialize(), action_choice, self.calculatePot());
          player.actedIn(self.stage_num);
          player = self.nextPlayer();
          cb();
        });
      },
      function loopComplete() {
        if (self.players.length >= Round.MIN_PLAYERS) {
          console.log('Betting round completed!', self.pot, self.players);
          self.takeBets();
          self.nextStage();
        }
        else {
          console.log('Not enough players to continue to next stage!', self.players);
          self.winner = 0;
          self.toStage('paying_out', [{ player: self.players[self.winner] }]);
        }
      }
    );
    // describes how to handle each action
    function performAction(action, num_chips) {
      console.log(player.username, 'acted!', action, num_chips);
      switch(action) {
      case 'check':
        break;
      case 'call':
        if (num_chips > player.chips) {
          console.error('Player tried to call with a value higher than his/r chip count!', num_chips, player.chips);
          return performAction(default_action, undefined);
        }
        else if (num_chips > min_bet) {
          console.error('Player tried to call with a value higher than min_bet!', num_chips, min_bet);
          return performAction(default_action, undefined);
        }
        player.makeBet(num_chips);
        break;
      case 'bet':
      case 'raise':
        if (num_chips < min_bet) {
          console.error('Player raised with less than min_bet!', num_chips, min_bet);
          return performAction(default_action, undefined);
        }
        else if (num_chips > max_bet) {
          console.error('Player raised with more than max_bet!', num_chips, max_bet);
          return performAction(default_action, undefined);
        }
        var raise = num_chips - to_call;
        self.high_bet += raise;
        player.makeBet(num_chips);
        last_raise = raise;
        break;
      case 'fold':
        self.playerOut(self.to_act);
        break;
      }
    }
    // notify everyone that this player is being waited on to act
    self.broadcast('player_to_act', player.serialize(), Round.TIMEOUT);
  };

  static_properties.stage_handlers.flopping = function() {
    this.community.push(this.deck.deal(), this.deck.deal(), this.deck.deal());
    this.broadcast('community_dealt', this.community);
    this.nextStage();
  };

  static_properties.stage_handlers.turning = function() {
    this.community.push(this.deck.deal());
    this.broadcast('community_dealt', this.community);
    this.nextStage();
  };

  static_properties.stage_handlers.rivering = function() {
    this.community.push(this.deck.deal());
    this.broadcast('community_dealt', this.community);
    this.nextStage();
  };

  static_properties.stage_handlers.showing_down = function() {
    var self = this
      , whole_hand
      , res
      , results;
    self.showed_down = true;
    results = _.map(self.players, function(player) {
          whole_hand = _.union(player.hand, self.community);
          res = evaluator.evalHand(whole_hand);
          //console.log(whole_hand, 'evaluated as', res);
          res.player = player;
          return res;
    });
    //console.log('results is', results);
    results = _.groupBy(results, function(result) {
      return (result.handType << 12) + result.handRank;
    });
    //console.log('grouped results:', results);
    var high_hand = _.max(_.keys(results), function(value) {
      return parseInt(value, 10);
    });
    results = results[high_hand];
    self.nextStage(results);
  };

  static_properties.stage_handlers.paying_out = function(winner_results) {
    var self = this
      , chips_won = Math.floor(self.pot / winner_results.length)
      , player_objs;
    //console.log('winner(s):', winner_results, ', chips_won:', chips_won);
    _.each(winner_results, function(winner_result) {
      winner_result.player.win(chips_won);
    });
    if (self.showed_down) {
      player_objs = _.map(self.players, function(player) {
        return player.serialize(['hand', 'chips_won']);
      });
      self.broadcast('hands_shown', player_objs);
    }
    else {
      player_objs = _.map(self.players, function(player) {
        return player.serialize(['hand', 'chips_won']);
      });
    }
    self.broadcast('winners', player_objs);
    setTimeout(function() {
      self.nextStage();
    }, Round.DISPLAY_HANDS_DURATION);
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

  RoundSchema.methods.nextStage = function() {
    if (this.stage_num + 1 >= Round.STAGES.length) {
      console.error('nextStage called when stage_num is', this.stage_num);
      return;
    }
    else {
      var args_array = [].slice.apply(arguments)
        , next_stage_num = this.stage_num + 1;
      args_array.unshift(next_stage_num);
      this.toStage.apply(this, args_array);
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
      var args_array = [].slice.apply(arguments)
        , event_name = 'stage_' + stage_name;
      args_array[0] = event_name;
      this.emit.apply(this, args_array);
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
    self.first_to_act = self.players.length > 2 ? 0 : 1;
    //console.log('calculated players:', self.players, 'small_blind_seat:', self.small_blind_seat);
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
      //console.log('got bet from player:', bet);
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
    //console.log('nextPlayer:', this.to_act, this.players[this.to_act]);
    return this.players[this.to_act];
  };

  RoundSchema.methods.playerOut = function(index) {
    var player = this.players[index]
      , bet = player.giveBet();
    //console.log('got bet from player:', bet);
    this.pot += bet;
    player.roundOver();
    this.players.splice(index, 1);
    if (this.to_act >= index) {
      this.to_act--;
    }
  };

  RoundSchema.methods.serialize = function(username) {
    var self = this
      , include = ['stage_num', 'dealer',
                          'small_blind_seat', 'to_act',
                          'high_bet', 'pot', 'winner',
                          'community', 'round_id']
      , all_players_include = []
      , this_player_include = ['hand']
      , round_obj = {};
    if (self.showed_down) {
      all_players_include.push('hand');
    }
    if (self.isInStage('paying_out') || self.isInStage('done')) {
      all_players_include.push('chips_won');
    }
    //console.log('round.serialize called, include is', include);
    _.each(include, function(key) {
      round_obj[key] = self[key];
    });
    round_obj.max_players = Round.MAX_PLAYERS;
    round_obj.seats = _.map(self.seats, serializePlayer);
    round_obj.players = _.map(self.players, serializePlayer);
    function serializePlayer(player) {
      var player_obj;
      if (player.username === username) {
        player_obj = player.serialize(_.union(all_players_include, this_player_include));
        player_obj.is_you = true;
      }
      else {
        player_obj = player.serialize(all_players_include);
      }
      return player_obj;
    }
    return round_obj;
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