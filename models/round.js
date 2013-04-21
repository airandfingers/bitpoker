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
    // at least how many chips must players bring to the table to play?
  , MIN_CHIPS: 50
    // at most how many chips can players bring to the table to play?
  , MAX_CHIPS: 10000
    // how a Round should handle each stage
    // {String stage_name: Function stage_handler}
  , stage_handlers: {}
    // how many ms to wait between polling to see how many players are ready
  , WAIT_POLL_INTERVAL: 1000
    // how many chips the big blind costs
  , SMALL_BLIND: 10
    // how many chips the small blind costs
  , BIG_BLIND: 20
    // which currency this table deals in (maobucks or cash)
  , CURRENCY: 'maobucks'
    // the minimum difference between two possible chip amounts at this table
  , MIN_INCREMENT: 1
    // how many maobucks it takes to buy a single chip at this table
  , MAOBUCKS_PER_CHIP: .01
    // how long (in ms) to wait for players to respond to prompts
  , TIMEOUT: 10000
    // how long (in ms) to wait for players to respond to prompts
  , DISPLAY_HANDS_DURATION: 5000
    // how long (in ms) players can sit out before being forced from their seats
  , SIT_OUT_TIME_ALLOWED: 30000 // 30 seconds (for testing)
    // how long (in ms) players are forced to wait before buying with less than they stood up with
  , MIN_BUYIN_TIME_ENFORCED: 30000 // 30 seconds (for testing)
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var RoundSchema = new Schema({
  // instance properties - document.field_name
    // {seat_num: Player}
    seats            : { type: Schema.Types.Mixed, default: function() { return {}; } }
    // the current stage, an index of Round.STAGES
  , stage_num        : { type: Number, default: 0 }
    // the current stage, one of Round.STAGES
  , stage_name        : { type: String, default: 'initializing' }
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
    var round = new Round(spec)
      , constants = _.pick(static_properties, ['MIN_CHIPS', 'MAX_CHIPS', 'SMALL_BLIND', 'BIG_BLIND']);
    // make sure the constants are all even multiples of the MIN_INCREMENT
    _.each(constants, function(value, name) {
      if (Round.roundNumChips(value) !== value) {
        console.error('Invalid', name, ':', value, 'given MIN_INCREMENT', Round.MIN_INCREMENT);
      }
    });
    if (Round.SMALL_BLIND % Round.MIN_INCREMENT !== 0 ||
        Round.BIG_BLIND % Round.MIN_INCREMENT !== 0) {
      console.error('Invalid blinds/increment!', Round.SMALL_BLIND, Round.BIG_BLIND, Round.MIN_INCREMENT);
    }
    round.initialize();

    return round;
  };

  RoundSchema.statics.roundNumChips = function(amount) {
    // console.log('Round.roundNumChips called with', amount, Round.MIN_INCREMENT);
    var rounded_amount = amount / Round.MIN_INCREMENT;
    // console.log('amount after dividing:', amount);
    rounded_amount = Math.round(rounded_amount);
    // console.log('amount after rounding:', amount);
    rounded_amount = rounded_amount * Round.MIN_INCREMENT;
    // console.log('amount after multiplying:', amount);
    console.log('rounded', amount, 'to', rounded_amount);
    return rounded_amount;
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

  static_properties.stage_handlers.waiting = function() {
    var self = this
      , wait_interval = setInterval(function() {
      var num_ready = 0;
      _.each(self.seats, function(player, seat_num) {
        //console.log('waiting:', seat_num, player, player.sitting_out);
        if (player instanceof Player) {
          if (! player.sitting_out) {
            if (player.chips < Round.SMALL_BLIND) {
              // player can't afford small blind - should be sitting out.
              player.sitOut();
            }
            else {
              // player is ready.
              num_ready++;
            }
          }
          else {
            // player is sitting out. ignore.
          }
        }
        else {
          console.error('seats contains non-player', player);
        }
      });

      if (num_ready >= Round.MIN_PLAYERS) {
        self.nextStage();
        clearInterval(wait_interval);
      }
    }, Round.WAIT_POLL_INTERVAL);
  };

  static_properties.stage_handlers.blinding = function() {
    var self = this
      , SMALL_BLIND_PAID = false
      , BIG_BLIND_PAID = false
      , player;

    self.calculatePlayers();
    while (SMALL_BLIND_PAID === false && 
           self.players.length >= Round.MIN_PLAYERS) {
      player = self.players[this.to_act];
      //console.log('this.to_act is', this.to_act, 'player is', player, 'players is', self.players);
      if (! player.isFlagSet('post_blind') || player.disconnected) {
        console.log('Player\'s post_blind flag is unset, or player is disconnected - sitting player out!');
        self.playerOut(self.to_act);
        player.sitOut();
      }
      else {
        console.log('player will post blind:', player, Round.SMALL_BLIND);
        player.makeBet(Round.SMALL_BLIND);
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
      if (! player.isFlagSet('post_blind') || player.disconnected) {
        console.log('Player\'s post_blind flag is unset, or player is disconnected - sitting player out!');
        self.playerOut(self.to_act);
        player.sitOut();
      }
      else {
        console.log('player will post blind:', player, Round.SMALL_BLIND);
        player.makeBet(Round.BIG_BLIND);
        self.broadcast('player_acts', player.serialize(), 'post_blind', self.calculatePot());
        BIG_BLIND_PAID = true;
      }
      self.nextPlayer();
    }

    if (SMALL_BLIND_PAID && BIG_BLIND_PAID) {
      self.nextStage();
    }
    else {
      console.log('Blinds not paid!', SMALL_BLIND_PAID, BIG_BLIND_PAID, self.players);
      self.toStage('done');
    }
  };

  static_properties.stage_handlers.dealing = function deal() {
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
  static_properties.stage_handlers.betting_postriver = function bettingRound() {
    var self = this
      , player
      , to_call
      , last_raise
      , min_bet
      , max_bet
      , actions
      , free_action
      , free_action_obj
      , bet_action
      , bet_action_obj;

    switch(this.stage_name) {
      case 'betting_preflop':
        // big-blind-player has already started the betting at the big blind level
        this.high_bet = Round.BIG_BLIND;
        last_raise = Round.SMALL_BLIND;
        break;
      case 'betting_postflop':
        console.log('Not in betting_preflop, so resetting high_bet and to_act');
        last_raise = Round.SMALL_BLIND;
        this.high_bet = 0;
        this.to_act = this.first_to_act;
        break;
      case 'betting_preriver':
      case 'betting_postriver':
        console.log('Not in betting_preflop, so resetting high_bet and to_act');
        last_raise = Round.BIG_BLIND;
        this.high_bet = 0;
        this.to_act = this.first_to_act;
        break;
      default:
        console.error('bettingRound called when stage_name is', this.stage_name);
    }

    player = self.currentPlayer();

    async.whilst(
      function shouldRunBody() { // test
        console.log('testing:',
                      '# of players: ' + self.players.length + ' vs. MIN_PLAYERS: ' + Round.MIN_PLAYERS,
                      'Has player acted yet? ' + player.hasActedIn(self.stage_num),
                      'current_bet: ' + player.current_bet + ' vs. high_bet: ' + self.high_bet);
        if (player.current_bet > self.high_bet) {
          // adjust player's current bet to be the high bet
          var refund = player.current_bet - self.high_bet;
          console.log('giving player', refund);
          player.getBet(refund);
          self.broadcast('player_gets_refund:', refund);
        }
        return self.players.length >= Round.MIN_PLAYERS &&
               ((! player.hasActedIn(self.stage_num)) || player.current_bet < self.high_bet);
      },
      function loopBody(cb) {
        // handle "no chips" condition
        if (player.chips === 0) {
          console.log('player is out of chips, so skipping!', player);
          setTimeout(function() {
            actions = [{ check: true}];
            performAction('check', undefined);
            cb();
          }, 1000);
          return;
        }
        else if (Round.roundNumChips(player.chips) !== player.chips) {
          console.error('player has an invalid chips value:', player.chips, Round.MIN_INCREMENT );
        }
        // calculate/set actions and free_action to be used in prompt
        actions = [];
        // raise/bet - "raise to" values
        to_call = self.high_bet - player.current_bet;
        min_bet = self.high_bet + last_raise;
        max_bet = player.current_bet + player.chips; // how much this player can raise to
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
        if (to_call > 0) {
          if (player.chips < to_call) {
            // player can't afford to call
            to_call = player.chips;
          }
          // player must pay to_call or fold
          actions.push({ call: to_call });
          free_action = 'fold';
        }
        else {
          // player can check
          free_action = 'check';
        }
        // fold/check
        free_action_obj = {};
        free_action_obj[free_action] = true;
        actions.push(free_action_obj);
      //   console.log(to_call
      // , last_raise
      // , min_bet
      // , max_bet
      // , actions
      // , free_action
      // , free_action_obj
      // , bet_action
      // , bet_action_obj);
        player.prompt(actions, Round.TIMEOUT, free_action, function(action_choice, num_chips_choice) {
          performAction(action_choice, num_chips_choice);
          cb();
        });
        // notify everyone that this player is being waited on to act
        self.broadcast('player_to_act', player.serialize(), Round.TIMEOUT);
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
          self.takeBets();
          self.toStage('paying_out', [{ player: self.players[self.winner] }]);
        }
      }
    );
    // describes how to handle each action
    function performAction(action, num_chips) {
      if (_.all(actions, function(action_obj) { return (action_obj[action] === undefined); })) {
        console.error('*~*Player chose invalid action', action, ', so treating it as', free_action);
        action = free_action; // act as if the player timed out (in less than Round.TIMEOUT)
        num_chips = undefined;
      }
      else if (_.isNumber(num_chips)) {
        var rounded_num_chips = Round.roundNumChips(num_chips);
        if (rounded_num_chips !== num_chips) {
          console.error('Received unrounded num_chips value:', num_chips, ', so rounding to', rounded_num_chips);
          num_chips = rounded_num_chips;
        }
      }
      switch(action) {
      case 'check':
        break;
      case 'call':
        if (num_chips > player.chips) {
          console.error('Player tried to call with a value higher than his/r chip count!', num_chips, player.chips);
          return performAction(free_action, undefined);
        }
        if (num_chips !== to_call) {
          console.error('Player tried to call with a value other than to_call!', num_chips, to_call);
          return performAction(free_action, undefined);
        }
        player.makeBet(num_chips);
        break;
      case 'bet':
      case 'raise':
        if (num_chips < min_bet) {
          console.error('Player raised with less than min_bet!', num_chips, min_bet);
          return performAction(free_action, undefined);
        }
        else if (num_chips > max_bet) {
          console.error('Player raised with more than max_bet!', num_chips, max_bet);
          return performAction(free_action, undefined);
        }
        var bet = num_chips - player.current_bet // how much the player bet
          , raise = bet - to_call; // how much the player RAISED
        player.makeBet(bet);
        self.high_bet += raise;
        last_raise = raise;
        break;
      case 'fold':
        self.playerOut(self.to_act);
        break;
      }
      self.broadcast('player_acts', player.serialize(), action, self.calculatePot());
      player.actedIn(self.stage_num);
      player = self.nextPlayer();
    }
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
      , chips_won = Round.roundNumChips(Math.floor(self.pot / winner_results.length))
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
    if (! _.isString(stage_name) || ! _.contains(Round.STAGES, stage_name)) {
      console.error('toStage called with', stage, stage_num, stage_name);
    }
    else {
      this.stage_num = stage_num;
      this.stage_name = stage_name;
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
      , num_players = _.keys(self.seats).length
      , first_to_blind = (num_players > 2 ? self.dealer + 1 : self.dealer) % Round.MAX_PLAYERS
      , seat_counter
      , first_round = true;
    for (seat_counter = first_to_blind;
         first_round || seat_counter !== first_to_blind;
         first_round = false,
         seat_counter = (seat_counter + 1) % Round.MAX_PLAYERS) {
      player = self.seats[seat_counter];
      if (player instanceof Player && ! player.sitting_out) {
        self.players.push(player);
        player.in_hand = true;
        if (_.isUndefined(self.small_blind_seat)) {
          self.small_blind_seat = seat_counter;
        }
      }
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
      if (bet !== Round.roundNumChips(bet)) {
        console.error('Invalid bet returned by giveBet:', bet, Round.MIN_INCREMENT);
        bet = Round.roundNumChips(bet);
      }
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
    //console.log('playerOut:', index, this.players[this.to_act]);
  };

  static_properties.includes = {
    all: ['stage_name', 'dealer', 'small_blind_seat', 'to_act',
          'high_bet', 'pot', 'winner', 'community', 'round_id',
          'max_players', 'min_chips', 'max_chips', 'min_increment', 
          'currency', 'maobucks_per_chip', 'seats', 'players']
  };
  RoundSchema.methods.serialize = function(this_username, include) {
    var self = this
      , round_include = include
      , all_players_include = []
      , this_player_include = ['hand', 'flags']
      , round_obj = {};

    if (_.isString(include)) {
      round_include = Round.includes[include];
      if (_.isUndefined(round_include)) {
        try {
          round_include = JSON.parse(include);
        }
        catch(e) {
          console.error('Error while parsing include:', e);
        }
      }
    }
    if (! _.isArray(round_include)) {
      console.error('Round.serialize called with include:', include, '.. defaulting to "all"');
      round_include = static_properties.includes.all;
    }

    if (self.showed_down) {
      all_players_include.push('hand');
    }
    if (self.isInStage('paying_out') || self.isInStage('done')) {
      all_players_include.push('chips_won');
      this_player_include.push('chips_won');
    }
    //console.log('round.serialize called, round_include is', round_include);
    _.each(round_include, function(key) {
      round_obj[key] = self[key];
    });
    //console.log('round_obj is', round_obj);
    if (_.contains(round_include, 'max_players')) round_obj.max_players = Round.MAX_PLAYERS;
    if (_.contains(round_include, 'min_chips')) round_obj.min_chips = Round.MIN_CHIPS;
    if (_.contains(round_include, 'max_chips')) round_obj.max_chips = Round.MAX_CHIPS;
    if (_.contains(round_include, 'currency')) round_obj.currency = Round.CURRENCY;
    if (_.contains(round_include, 'min_increment')) round_obj.min_increment = Round.MIN_INCREMENT;
    if (_.contains(round_include, 'maobucks_per_chip')) round_obj.maobucks_per_chip = Round.MAOBUCKS_PER_CHIP;
    if (_.contains(round_include, 'seats')) round_obj.seats = _.map(round_obj.seats, serializePlayer);
    if (_.contains(round_include, 'players')) round_obj.players = _.map(round_obj.players, serializePlayer);
    function serializePlayer(player) {
      var player_obj;
      if (player.username === this_username) {
        player_obj = player.serialize(this_player_include);
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