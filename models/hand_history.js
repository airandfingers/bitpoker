module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore') // list utility library
    , async = require('async'); // sync/async control flow library
  _.str = require('underscore.string'); // string manipulation utility library

  var static_properties = {
  // static properties (attached below) - Model.property_name
    SITE_NAME: 'bitpoker'
  , TABLE_TYPE: 'Cash Game'
  , GAME_TYPE: 'No Limit Hold\'em'
  };

  /* the schema - defines the "shape" of the documents:
   *   gets compiled into one or more models */
  var HandHistorySchema = new Schema({
  // instance properties - document.field_name
    // the HoldEmHand this HandHistory is recording (not stored in DB)
    hand               : Schema.Types.Mixed
    // the hand history string, compatible with pokerhand.org
  , history_string     : { type: String, default: '' }
    // time at which hands were dealt
  , started_at         : Date
    // serialized player objects at deal-time
  , initial_player_objs: { type: [Schema.Types.Mixed], default: function() { return []; } }
    // names of users who participated in this hand
  , usernames          : { type: [String], default: function() { return []; } }
    // time at which winnings were paid out
  , finished_at        : Date
    // serialized player objects at payout-time
  , final_player_objs  : { type: [Schema.Types.Mixed], default: function() { return []; } }
  });

  // static methods - Model.method()
  HandHistorySchema.statics.createHandHistory = function(spec) {
    /* our "constructor" function. Usage: HandHistory.createHandHistory({prop: 'val'})
       (see Schema definition for list of properties)*/
    //console.log('HandHistory.createHandHistory called!', spec);
    var hand_history = new HandHistory(spec);
    return hand_history;
  };

  // instance methods - document.method()
  HandHistorySchema.methods.logStart = function(started_at, initial_player_objs) {
    var self = this
     , game = self.hand.game;
    if (! _.isObject(game) || ! _.isDate(started_at) || ! _.isArray(initial_player_objs)) {
      console.error('HandHistory.logStart called with invalid arguments:', game, started_at, initial_player_objs);
    }

    // override instance properties
    self.started_at = started_at;
    self.initial_player_objs = initial_player_objs;
    self.usernames = _.pluck(initial_player_objs, 'username');
    
    // add first line
    self.appendToHistoryString(_.str.sprintf(
      '%s Game #%s, %d/%d %s %s - %s\n'
    , HandHistory.SITE_NAME
    , self.hand.table_name + '.' + self.hand.hand_num
    , game.SMALL_BLIND
    , game.BIG_BLIND
    , game.CURRENCY_ABBREV
    , HandHistory.GAME_TYPE
    , started_at
    ));
    // add second line
    self.appendToHistoryString(_.str.sprintf(
      "Table '%s' %d-max Seat #%d is the dealer\n"
    , self.hand.table_name
    , game.MAX_PLAYERS
    , self.hand.dealer
    ));
    // add seat lines
    console.log(self.hand.seats);
    _.each(_.sortBy(self.hand.seats, 'seat'), function(player, seat_num) {
      if (player.in_hand) {
        self.appendToHistoryString(_.str.sprintf(
          'Seat %d: %s (%d in chips)\n'
        , player.seat
        , player.username
        , player.chips
        ));
      }
      else {
        console.log(player.username, 'is not in hand, so skipping!');
      }
    });
  };

  HandHistorySchema.methods.logStage = function(stage_name) {
    // log based on stage that just happened
    var self = this
      , community = self.hand.community;
    switch(stage_name) {
    case 'dealing':
      self.appendToHistoryString('*** HOLE CARDS ***');
      _.each(self.hand.players, function(player) {
        if (_.isArray(player.hand)) {
          self.appendToHistoryString(_.str.sprintf(
            'Dealt to %s [%s %s]'
          , player.username
          , player.hand[0]
          , player.hand[1]
          ));
        }
        else {
          console.error('player in players without hand after dealing!', player);
        }
      })
      break;
    case 'flopping':
      self.appendToHistoryString(_.str.sprintf(
        '*** FLOP *** [%s %s %s]'
      , community[0], community[1], community[2]
      ));
    case 'turning':
      self.appendToHistoryString(_.str.sprintf(
        '*** TURN *** [%s %s %s] [%s]'
      , community[0], community[1], community[2]
      , community[3]
      ));
    case 'rivering':
      self.appendToHistoryString(_.str.sprintf(
        '*** RIVER *** [%s %s %s %s] [%s]'
      , community[0], community[1], community[2], community[3]
      , community[4]
      ));
    default: console.error('Unknown stage name', stage_name);
    }
  };

  HandHistorySchema.methods.logAction = function(player, action, amount, raised_to) {
    // log based on action that was performed
    var line = player.username + ': '
      , game = this.hand.game;
    switch(action) {
    case 'post_blind':
      line += 'posts '
      if (amount === game.SMALL_BLIND) { line += 'small'; }
      else if (amount === game.BIG_BLIND) { line += 'big'; }
      else { console.error('Unknown blind value:', amount); }
      line += ' blind ' + amount;
      if (player.chips === 0) { line += ' and is all-in'; }
      break;
    case 'check':
      line += 'checks';
      break;
    case 'call':
      line += 'calls ' + amount;
      if (player.chips === 0) { line += ' and is all-in'; }
      break;
    case 'fold':
      line += 'folds';
      break;
    case 'bet':
      line += 'bets ' + amount;
      if (player.chips === 0) { line += ' and is all-in'; }
      break;
    case 'raise':
      line += 'raises ' + amount + ' to ' + raised_to;
      if (player.chips === 0) { line += ' and is all-in'; }
      break;
    default: console.error('Unknown action', action);
    }
    this.appendToHistoryString(line);
  };

  HandHistorySchema.methods.logEnd = function(finished_at, final_player_objs) {
    this.finished_at = finished_at;
    this.final_player_objs = final_player_objs;
    this.save(function(err, result) {
      console.log('Returned from hand_history.save:', err, result);
    });
  };

  HandHistorySchema.methods.appendToHistoryString = function(line_to_append) {
    this.history_string += line_to_append + '\n';
  };

  HandHistorySchema.pre('save', function(next) {
    this.hand = null;
    next();
  });

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var HandHistory = mongoose.model('hand_history', HandHistorySchema);

  //static properties (defined above)
  _.extend(HandHistory, static_properties);

  return HandHistory;
})();