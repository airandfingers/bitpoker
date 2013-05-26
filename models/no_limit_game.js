module.exports = (function () {
  var mongoose = require('mongoose') // MongoDB abstraction layer
    , Schema = mongoose.Schema // Mongoose Schema constructor
    , ObjectId = Schema.ObjectId // Mongoose ObjectId type

    , _ = require('underscore'); // list utility library

  var NoLimitGameSchema = new Schema({
  // instance properties - document.field_name
    // the number of players who need to be sitting/blinding before the hand can begin
    MIN_PLAYERS: { type: Number, default: 2 }
    // the maximum number of players this came can have
  , MAX_PLAYERS: { type: Number, default: 10 }
    // at least how many chips must players bring to the table to play?
  , MIN_CHIPS: { type: Number, default: 50 }
    // at most how many chips can players bring to the table to play?
  , MAX_CHIPS: { type: Number, default: 10000 }
    // how many chips the big blind costs
  , SMALL_BLIND: { type: Number, default: 10 }
    // how many chips the small blind costs
  , BIG_BLIND: { type: Number, default: 20 }
    // how many maobucks it takes to buy a single chip at this table
  , CURRENCY_PER_CHIP: { type: Number, default: 1E-5 }

    // which currency this game deals in (maobucks or cash)
  , CURRENCY: { type: String, default: 'maobucks' }
    // the minimum difference between two possible chip amounts at this table
  , MIN_INCREMENT: { type: Number, default: 1 }

  // CONSTANT FOR ALL GAMES
    // how many ms to wait between polling to see how many players are ready
  , WAIT_POLL_INTERVAL: { type: Number, default: 5000 }
    // how long (in ms) between last betting action and street_ends message
  , STREET_END_DELAY: { type: Number, default: 1000 }
    // how long (in ms) between street_ends and community_dealt messages
  , PRE_DEAL_DELAY: { type: Number, default: 1000 }
    // how long (in ms) to wait before automatically skipping players who should be skipped
  , SKIP_PLAYER_DELAY : { type: Number, default: 1000 }
    // how long (in ms) to wait for players to respond to prompts
  , ACT_TIMEOUT: { type: Number, default: 10000 }
    // how long (in ms) to wait for players to respond to prompts
  , DISPLAY_HANDS_DURATION: { type: Number, default: 5000 }
    // how long (in ms) players can sit out before being forced from their seats
  , SIT_OUT_TIME_ALLOWED: { type: Number, default: 30000 } // 30 seconds (for testing)
    // how long (in ms) players are forced to wait before buying with less than they stood up with
  , MIN_BUYIN_TIME_ENFORCED: { type: Number, default: 30000 } // 30 seconds (for testing)
  });

  NoLimitGameSchema.statics.createNoLimitGame = function(spec) {
    if (_.isNumber(spec.SMALL_BLIND) && _.isUndefined(spec.BIG_BLIND)) {
      spec.BIG_BLIND = spec.SMALL_BLIND * 2;
    }
    //console.log('creating NoLimitGame:', spec);
    var game = new NoLimitGame(spec);

    return game;
  };

  function roundBy(amount, round_by) {
    var rounded_amount;
    //console.log('game.roundNumChips called with', amount, round_by);
    if (round_by > 1) {
      //divide by round_by, round, multiply
      rounded_amount = amount / round_by;
      rounded_amount = Math.round(rounded_amount);
      rounded_amount = rounded_amount * round_by;
    }
    else {
      //multiply by Math.round(1 / round_by), round, divide
      var round_by_inverse = Math.round(1 / round_by);
      //console.log('min_increment_inverse:', min_increment_inverse);
      rounded_amount = amount * round_by_inverse;
      //console.log('after multiplying:', rounded_amount);
      rounded_amount = Math.round(rounded_amount);
      //console.log('after rounding:', rounded_amount);
      rounded_amount = rounded_amount / round_by_inverse;
      //console.log('after dividing:', rounded_amount);
    }
    console.log('rounded', amount, 'to', rounded_amount);
    return rounded_amount;
  }

  // rounds chip numbers to the nearest MIN_INCREMENT value
  NoLimitGameSchema.methods.roundNumChips = function(amount) {
    var rounded_amount = roundBy(amount, this.MIN_INCREMENT);
    //console.log('rounded', amount, 'to', rounded_amount);
    return rounded_amount;
  };

  NoLimitGameSchema.methods.roundNumCurrency = function(amount) {
    var rounded_amount = roundBy(amount, this.CURRENCY_PER_CHIP);
    //console.log('rounded', amount, 'to', rounded_amount);
    return rounded_amount;
  };

  // returns a copy of this class's constants
  NoLimitGameSchema.methods.constants = function() {
    var serialized = this.toObject();
    delete serialized.serialize;
    delete serialized.roundNumChips;
    delete serialized._id;
    console.log('serialized:', serialized);
    return serialized;
  }

  var static_properties = {
  // static properties (attached below) - Model.property_name
  };

  /* the model - a fancy constructor compiled from the schema:
   *   a function that creates a new document
   *   has static methods and properties attached to it
   *   gets exported by this module */
  var NoLimitGame = mongoose.model('NoLimitGame', NoLimitGameSchema);

  // static properties (defined above)
  _.extend(NoLimitGame, static_properties);
  
  return NoLimitGame;
})();