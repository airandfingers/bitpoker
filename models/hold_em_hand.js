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
    // the stages this hand can be in, in order
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
    // how a HoldEmHand should handle each stage
    // {String stage_name: Function stage_handler}
  , stage_handlers: {}
    // how many ms to wait between polling to see how many players are ready
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var HoldEmHandSchema = new Schema({
  // instance properties - document.field_name
    // the hold-em game this hand is an instance of (holds game constants)
    game             : Schema.Types.Mixed
    // a reference to the seats that can play, {seat_num: Player}
  , seats            : { type: Schema.Types.Mixed, default: function() { return {}; } }
    // the current stage, an index of HoldEmHand.STAGES
  , stage_num        : { type: Number, default: 0 }
    // the current stage, one of HoldEmHand.STAGES
  , stage_name        : { type: String, default: 'initializing' }
    // the function this hand can call to broadcast to all players in the room
  , broadcast        : Schema.Types.Mixed
    // the seat number of the dealer (use to calculate order-adjusted players)
  , dealer           : Number
    // the seat number of the small blind (as determined when collecting blinds)
  , small_blind_seat : Number
    // the players that are currently participating in the hand, in order of action
  , players          : { type: [Schema.Types.Mixed], default: function() { return []; } }
    // the index (within this.players) of the next player to act
  , to_act           : { type: Number, default: 0 }
    // the highest bet so far in this betting round
  , high_bet         : Number
    // the number of chips in the pot (matched by all active players)
  , pot              : { type: Number, default: 0 }
    // the index (within this.players) of the winning player
  , winner           : Number
    // the deck this hand uses (created in initialize)
  , deck             : Schema.Types.Mixed
    // the cards that are visible to everyone
  , community        : { type: [String], default: function() { return []; } }
    // unique identifier for this HoldEmHand
  , hand_id         : String
  });

  // static methods - Model.method()
  HoldEmHandSchema.statics.createHoldEmHand = function(spec) {
    /* our "constructor" function. Usage: HoldEmHand.createHoldEmHand({prop: 'val'})
       (see Schema definition for list of properties)*/
    console.log('HoldEmHand.createHoldEmHand called!', spec);
    var hand = new HoldEmHand(spec)
      , constants
      , game = spec.game;
    if (! _.isObject(game)) {
      console.error('HoldEmHand.createHoldEmHand called without a game!');
      return;
    }
    else if (! _.isFunction(game.roundNumChips)) {
      console.error('HoldEmHand.createHoldEmHand called with a game without a roundNumChips method!');
      return;
    }
    constants = _.pick(game, ['MIN_CHIPS', 'MAX_CHIPS', 'SMALL_BLIND', 'BIG_BLIND']);
    // make sure the constants are all even multiples of the MIN_INCREMENT
    _.each(constants, function(value, name) {
      if (game.roundNumChips(value) !== value) {
        console.error('Invalid', name, ':', value, 'given MIN_INCREMENT', spec.game.MIN_INCREMENT);
      }
    });
    if (game.SMALL_BLIND % game.MIN_INCREMENT !== 0 ||
        game.BIG_BLIND % game.MIN_INCREMENT !== 0) {
      console.error('Invalid blinds/increment!', game.SMALL_BLIND, game.BIG_BLIND, game.MIN_INCREMENT);
    }
    hand.initialize();

    return hand;
  };

  // instance methods - document.method()
  HoldEmHandSchema.methods.initialize = function() {
    var self = this
      , player
      , handler;

    self.deck = Deck.createDeck({});

    _.each(HoldEmHand.stage_handlers, function(handler, stage_name) {
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
      , game = self.game
      , wait_interval = setInterval(function() {
      var num_ready = 0;
      _.each(self.seats, function(player, seat_num) {
        //console.log('waiting:', seat_num, player, player.sitting_out);
        if (player instanceof Player) {
          if (! player.sitting_out) {
            if (player.chips < game.SMALL_BLIND) {
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

      if (num_ready >= game.MIN_PLAYERS) {
        self.nextStage();
        clearInterval(wait_interval);
      }
    }, game.WAIT_POLL_INTERVAL);
  };

  static_properties.stage_handlers.blinding = function() {
    var self = this
      , game = self.game
      , SMALL_BLIND_PAID = false
      , BIG_BLIND_PAID = false
      , player;

    self.calculatePlayers();
    while (SMALL_BLIND_PAID === false && 
           self.players.length >= game.MIN_PLAYERS) {
      player = self.players[this.to_act];
      //console.log('this.to_act is', this.to_act, 'player is', player, 'players is', self.players);
      if (! player.isFlagSet('post_blind') || player.disconnected) {
        console.log('Player\'s post_blind flag is unset, or player is disconnected - sitting player out!');
        self.playerOut(self.to_act);
        player.sitOut();
      }
      else {
        console.log('player will post blind:', player, game.SMALL_BLIND);
        player.makeBet(game.SMALL_BLIND);
        self.broadcast('player_acts', player.serialize(), 'post_blind', self.calculatePot());
        SMALL_BLIND_PAID = true;
      }
      self.nextPlayer();
    }

    while (SMALL_BLIND_PAID &&
           BIG_BLIND_PAID === false &&
           self.players.length >= game.MIN_PLAYERS) {
      player = self.players[this.to_act];
      //console.log('this.to_act is', this.to_act, 'player is', player, 'players is', self.players);
      if (! player.isFlagSet('post_blind') || player.disconnected) {
        console.log('Player\'s post_blind flag is unset, or player is disconnected - sitting player out!');
        self.playerOut(self.to_act);
        player.sitOut();
      }
      else {
        console.log('player will post blind:', player, game.SMALL_BLIND);
        player.makeBet(game.BIG_BLIND);
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
      , game = self.game
      , player
      , to_call
      , last_raise
      , min_bet
      , max_bet
      , high_stack
      , actions
      , free_action
      , free_action_obj
      , bet_action
      , bet_action_obj;

    switch(this.stage_name) {
      case 'betting_preflop':
        // big-blind-player has already started the betting at the big blind level
        this.high_bet = game.BIG_BLIND;
        last_raise = game.SMALL_BLIND;
        break;
      case 'betting_postflop':
        console.log('Not in betting_preflop, so resetting high_bet and to_act');
        last_raise = game.SMALL_BLIND;
        this.high_bet = 0;
        this.to_act = this.first_to_act;
        break;
      case 'betting_preriver':
      case 'betting_postriver':
        console.log('Not in betting_preflop, so resetting high_bet and to_act');
        last_raise = game.BIG_BLIND;
        this.high_bet = 0;
        this.to_act = this.first_to_act;
        break;
      default:
        console.error('bettingRound called when stage_name is', this.stage_name);
    }

    player = self.currentPlayer();

    async.whilst(
      function shouldRunBody() { // test called before body - determines whether to run or skip
        console.log('testing:',
                      '# of players: ' + self.players.length + ' vs. MIN_PLAYERS: ' + game.MIN_PLAYERS,
                      'Has player acted yet? ' + player.hasActedIn(self.stage_num),
                      'current_bet: ' + player.current_bet + ' vs. high_bet: ' + self.high_bet);
        if (player.current_bet > self.high_bet) {
          // adjust player's current bet to be the high bet
          var refund = player.current_bet - self.high_bet;
          console.error('giving player', refund);
          player.getBet(refund);
        }
        return self.players.length >= game.MIN_PLAYERS &&
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
        else if (game.roundNumChips(player.chips) !== player.chips) {
          console.error('player has an invalid chips value:', player.chips, game.MIN_INCREMENT );
        }
        // handle "everyone else out of chips" condition
        high_stack = self.calculateHighestStack(player); // how high other players can call to
        if (high_stack === 0) {
          console.log('all other players are out of chips, so skipping!', player);
          setTimeout(function() {
            actions = [{ check: true}];
            performAction('check', undefined);
            cb();
          }, 1000);
          return;
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
        player.prompt(actions, game.ACT_TIMEOUT, free_action, function(action_choice, num_chips_choice) {
          performAction(action_choice, num_chips_choice);
          cb();
        });
        // notify everyone that this player is being waited on to act
        self.broadcast('player_to_act', player.serialize(), game.ACT_TIMEOUT);
      },
      function loopComplete() {
        if (self.players.length >= game.MIN_PLAYERS) {
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
        action = free_action; // act as if the player timed out (in less than game.TIMEOUT)
        num_chips = undefined;
      }
      else if (_.isNumber(num_chips)) {
        var rounded_num_chips = game.roundNumChips(num_chips);
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
      , game = self.game
      , chips_won = game.roundNumChips(Math.floor(self.pot / winner_results.length))
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
    }, game.DISPLAY_HANDS_DURATION);
  };

  static_properties.stage_handlers.done = function() {
    var self = this
      , game = self.game
      , num_players = self.players.length;
    if (num_players > game.MIN_PLAYERS) {
      console.error(num_players + ' players in at cleanup!', self.players);
    }
    console.log('Hand over! Notifying players...');
    _.each(self.players, function(player) {
      player.handOver();
    });
  };

  HoldEmHandSchema.methods.nextStage = function() {
    if (this.stage_num + 1 >= HoldEmHand.STAGES.length) {
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

  HoldEmHandSchema.methods.toStage = function(stage) {
    var stage_num = _.indexOf(HoldEmHand.STAGES, stage);
    if (stage_num === -1) {
      stage_num = stage;
    }
    var stage_name = HoldEmHand.STAGES[stage_num];
    if (! _.isString(stage_name) || ! _.contains(HoldEmHand.STAGES, stage_name)) {
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

  HoldEmHandSchema.methods.isInStage = function(stage) {
    if (_.isNumber(stage)) {
      return this.stage_num === stage;
    }
    else if (_.isString(stage)) {
      return HoldEmHand.STAGES[this.stage_num] === stage;
    }
    else {
      console.error('isInStage called with', stage);
    }
  };

  HoldEmHandSchema.methods.onStage = function(stage, handler) {
    if (! _.isFunction(handler)) {
      console.error('onStage called with non-function', handler);
    }
    else {
      this.on('stage_' + stage, handler);
    }
  };

  HoldEmHandSchema.methods.calculatePlayers = function() {
    var self = this
      , game = self.game
      , player
      , num_players = _.keys(self.seats).length
      , first_to_blind = (num_players > 2 ? self.dealer + 1 : self.dealer) % game.MAX_PLAYERS
      , seat_counter
      , first_round = true;
    for (seat_counter = first_to_blind;
         first_round || seat_counter !== first_to_blind;
         first_round = false,
         seat_counter = (seat_counter + 1) % game.MAX_PLAYERS) {
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

  // calculate how much is in the pot, including current bets
  HoldEmHandSchema.methods.calculatePot = function() {
    var bets = 0;
    _.each(this.players, function(player) {
      bets += player.current_bet;
    });
    return this.pot + bets;
  };

  // calculate what's the highest amount any player (other than the given one) can bet,
  // including current bets
  HoldEmHandSchema.methods.calculateHighestStack = function(player_to_ignore) {
    var stack_including_bet
      , high_stack = 0;
    _.each(this.players, function(player) {
      if (player.username !== player_to_ignore.username) {
        stack_including_bet = player.chips + player.current_bet;
        if (stack_including_bet > high_stack) {
          high_stack = stack_including_bet;
        }
      }
      // else ignore
    });
    return high_stack;
  };

  HoldEmHandSchema.methods.takeBets = function() {
    var self = this
      , game = self.game
      , bet;
    _.each(self.players, function(player) {
      bet = player.giveBet();
      if (bet !== game.roundNumChips(bet)) {
        console.error('Invalid bet returned by giveBet:', bet, game.MIN_INCREMENT);
        bet = game.roundNumChips(bet);
      }
      //console.log('got bet from player:', bet);
      self.pot += bet;
    });
  };

  HoldEmHandSchema.methods.currentPlayer = function() {
    return this.players[this.to_act];
  };

  HoldEmHandSchema.methods.nextPlayer = function() {
    this.to_act++;
    if (this.to_act >= this.players.length) {
      this.to_act = 0;
    }
    //console.log('nextPlayer:', this.to_act, this.players[this.to_act]);
    return this.players[this.to_act];
  };

  HoldEmHandSchema.methods.playerOut = function(index) {
    var player = this.players[index]
      , bet = player.giveBet();
    //console.log('got bet from player:', bet);
    this.pot += bet;
    player.handOver();
    this.players.splice(index, 1);
    if (this.to_act >= index) {
      this.to_act--;
    }
    //console.log('playerOut:', index, this.players[this.to_act]);
  };

  static_properties.includes = {
    all: ['stage_name', 'dealer', 'small_blind_seat', 'to_act',
          'high_bet', 'pot', 'winner', 'community', 'hand_id',
          'max_players', 'min_chips', 'max_chips', 'min_increment', 
          'currency', 'maobucks_per_chip', 'seats', 'players']
  };
  HoldEmHandSchema.methods.serialize = function(this_username, include) {
    var self = this
      , game = self.game
      , hand_include = include
      , all_players_include = []
      , this_player_include = ['hand', 'flags']
      , hand_obj = {};

    if (_.isString(include)) {
      hand_include = HoldEmHand.includes[include];
      if (_.isUndefined(hand_include)) {
        try {
          hand_include = JSON.parse(include);
        }
        catch(e) {
          console.error('Error while parsing include:', e);
        }
      }
    }
    if (! _.isArray(hand_include)) {
      console.error('HoldEmHand.serialize called with include:', include, '.. defaulting to "all"');
      hand_include = static_properties.includes.all;
    }

    if (self.showed_down) {
      all_players_include.push('hand');
    }
    if (self.isInStage('paying_out') || self.isInStage('done')) {
      all_players_include.push('chips_won');
      this_player_include.push('chips_won');
    }
    //console.log('hand.serialize called, hand_include is', hand_include);
    _.each(hand_include, function(key) {
      hand_obj[key] = self[key];
    });
    //console.log('hand_obj is', hand_obj);
    if (_.contains(hand_include, 'max_players')) hand_obj.max_players = game.MAX_PLAYERS;
    if (_.contains(hand_include, 'min_chips')) hand_obj.min_chips = game.MIN_CHIPS;
    if (_.contains(hand_include, 'max_chips')) hand_obj.max_chips = game.MAX_CHIPS;
    if (_.contains(hand_include, 'currency')) hand_obj.currency = game.CURRENCY;
    if (_.contains(hand_include, 'min_increment')) hand_obj.min_increment = game.MIN_INCREMENT;
    if (_.contains(hand_include, 'maobucks_per_chip')) hand_obj.maobucks_per_chip = game.MAOBUCKS_PER_CHIP;
    if (_.contains(hand_include, 'seats')) hand_obj.seats = _.map(hand_obj.seats, serializePlayer);
    if (_.contains(hand_include, 'players')) hand_obj.players = _.map(hand_obj.players, serializePlayer);
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
    return hand_obj;
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var HoldEmHand = mongoose.model('HoldEmHand', HoldEmHandSchema);

  //static properties (defined above)
  _.extend(HoldEmHand, static_properties);

  return HoldEmHand;
})();