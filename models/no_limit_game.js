module.exports = (function () {
  var game = {
    // the number of players who need to be sitting/blinding before the hand can begin
    MIN_PLAYERS: 2
    // the maximum number of players this came can have
  , MAX_PLAYERS: 10
    // at least how many chips must players bring to the table to play?
  , MIN_CHIPS: 50
    // at most how many chips can players bring to the table to play?
  , MAX_CHIPS: 10000
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
  , ACT_TIMEOUT: 10000
    // how long (in ms) to wait for players to respond to prompts
  , DISPLAY_HANDS_DURATION: 5000
    // how long (in ms) players can sit out before being forced from their seats
  , SIT_OUT_TIME_ALLOWED: 30000 // 30 seconds (for testing)
    // how long (in ms) players are forced to wait before buying with less than they stood up with
  , MIN_BUYIN_TIME_ENFORCED: 30000 // 30 seconds (for testing)
    // rounds chip numbers to the nearest MIN_INCREMENT value
  , roundNumChips: function(amount) {
      // console.log('game.roundNumChips called with', amount, game.MIN_INCREMENT);
      var rounded_amount = amount / this.MIN_INCREMENT;
      // console.log('amount after dividing:', amount);
      rounded_amount = Math.round(rounded_amount);
      // console.log('amount after rounding:', amount);
      rounded_amount = rounded_amount * this.MIN_INCREMENT;
      // console.log('amount after multiplying:', amount);
      console.log('rounded', amount, 'to', rounded_amount);
      return rounded_amount;
    }
  };
  return game;
})();