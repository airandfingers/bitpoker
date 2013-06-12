module.exports = (function() {
  return {
    defaults: {
      // the number of players who need to be sitting/blinding before the hand can begin
      MIN_PLAYERS: 2
      // the maximum number of players this came can have
    , MAX_PLAYERS: 10
      // at least how many chips must players bring to the table to play?
    , MIN_CHIPS: 50
      // at most how many chips can players bring to the table to play?
    , MAX_CHIPS: 10000
      // how many chips the big blind costs
    , SMALL_BLIND: 10
      // how many chips the small blind costs
    , BIG_BLIND: 20

      // how much currency it takes to buy a single chip at this table
    , CURRENCY_PER_CHIP: 1E-5
      // which currency this game deals in (maobucks or cash)
    , CURRENCY: 'maobucks'
      // the minimum difference between two possible chip amounts at this table
    , MIN_INCREMENT: 1

    // CONSTANT FOR ALL GAMES
      // how many ms to wait between polling to see how many players are ready
    , WAIT_POLL_INTERVAL: 5000
      // how long (in ms) between last betting action and street_ends message
    , STREET_END_DELAY: 1000
      // how long (in ms) between street_ends and community_dealt messages
    , PRE_DEAL_DELAY: 1000
      // how long (in ms) to wait before automatically skipping players who should be skipped
    , SKIP_PLAYER_DELAY : 1000
      // how long (in ms) to wait for players to respond to prompts
    , ACT_TIMEOUT: 10000
      // how long (in ms, per pot) to wait after winners message and before reset_table message
    , DISPLAY_HANDS_DURATION: 3000
      // how long (in ms) players can sit out before being forced from their seats
    , SIT_OUT_TIME_ALLOWED: 30000 // 30 seconds (for testing)
      // how long (in ms) players are forced to wait before buying with less than they stood up with
    , MIN_BUYIN_TIME_ENFORCED: 30000 // 30 seconds (for testing)
    }
  // which values are enumerated below for each game type
  , set_per_game: ['SMALL_BLIND', 'MIN_CHIPS', 'MAX_CHIPS', 'MAX_PLAYERS'] 
  // list of game types to be created for each currency
  // each entry lists the constants in set_per_game's order
  , game_types: [
    // small blind  max stack
    //      min stack    max players
    //  SB    MIN    MAX    MAXP
      [   1,    5,   100,    10]
    , [   5,   25,   500,    10]
    , [  25,  100,  2500,    10]
    , [ 100,  500,   1E4,    10]
    , [ 500, 2500,   5E4,    10]
    , [2500,  1E4,  25E4,    10]
    , [ 1E4,  5E4,   1E6,    10]
    , [ 5E4, 25E4,   5E6,    10]
    , [25E4,  1E5,  25E6,    10]
    , [ 1E5,  5E5,   1E7,    10]
    , [ 5E5, 25E5,   5E7,    10]
    , [25E5,  1E6,  25E7,    10]
    , [ 1E6,  5E6,   1E8,    10]
    , [ 5E6, 25E6,   5E8,    10]
    , [25E6,100E6,  25E8,     2]
    ]

  // which values are enumerated below for each currency type
  , set_per_currency: ['CURRENCY', 'CURRENCY_PER_CHIP']
  // list of currencies and their associated values
  // each entry lists the constants in set_per_currency's order
  , currency_types: [
    // currency   $/chip
      ['maobucks', 1E-5]
    , ['satoshi',  1   ]
    ]
  };
})();