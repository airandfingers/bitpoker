module.exports = (function() {
  return {
    // CONSTANT FOR ALL GAMES
    defaults: {
      // the number of players who need to be sitting/blinding before the hand can begin
      MIN_PLAYERS: 2
      // the minimum difference between two possible chip amounts at this table
    , MIN_INCREMENT: 1

      // how many ms to wait between polling to see how many players are ready
    , WAIT_POLL_INTERVAL: 5000
      // how long (in ms) between notifying about dealer change and posting small blind
    , DEALER_CHANGE_DELAY: 1000
      // how long (in ms) to wait - per player - after sending the hands_dealt message
    , PER_PLAYER_DEAL_DELAY: 150
      // how long (in ms) between posting blinds and next action (next blind or dealing)
    , POST_BLIND_DELAY: 300
      // how long (in ms) between last betting action and street_ends message
    , STREET_END_DELAY: 1000
      // how long (in ms) between street_ends message and next round, when bets have been collected
    , BET_COLLECTION_DELAY: 500
      // how long (in ms) between street_ends and community_dealt messages
    , PRE_DEAL_DELAY: 1000
      // how long (in ms) to wait before automatically skipping players who should be skipped
    , SKIP_PLAYER_DELAY : 1000
      // how long (in ms) to wait for players to respond to prompts
    , ACT_TIMEOUT: 16000
      // how long (in ms, per pot) to wait after winners message and before reset_table message
    , DISPLAY_HANDS_DURATION: 3000
      // how long (in ms) players can sit out before being forced from their seats
    , SIT_OUT_TIME_ALLOWED: 30000 // 30 seconds (for testing)
      // how long (in ms) players are forced to wait before buying with less than they stood up with
    , MIN_BUYIN_TIME_ENFORCED: 30000 // 30 seconds (for testing)
    // how often (in ms) to update the active player's time_to_act
    , TO_ACT_UPDATE_INTERVAL: 3000
    }
  // which values are enumerated below for each game type
  , set_per_game: ['SMALL_BLIND', 'MIN_CHIPS', 'MAX_CHIPS', 'MAX_PLAYERS'] 
  // list of game types to be created for each currency
  // each entry lists the constants in set_per_game's order
  , game_types: [
    // small blind  max stack
    //      min stack    max players
    //  SB    MIN    MAX    MAXP
     [   1,   40,   100,   10]
    ,  [   1,   40,   100,    8]
    , [   1,  100,   200,    4]
    , [   1,   25,  200,    2]
    , [   2,    80,   200,     8]
    , [   2,    50,   200,     2]
    , [   2,    200,   400,    4]
    , [ 100,  500,   1E4,    6]
    , [ 500, 2500,   5E4,    6]
    , [2500,  1E4,  25E4,    6]
    , [ 1E4,  5E4,   1E6,    6]
    , [ 5E4, 25E4,   5E6,    6]
    , [25E4,  1E5,  25E6,    6]
    , [ 1E5,  5E5,   1E7,    6]
    , [ 5E5, 25E5,   5E7,    6]
    , [25E5,  1E6,  25E7,    6]
    , [ 1E6,  5E6,   1E8,    6]
    , [ 5E6, 25E6,   5E8,    6]
    , [25E6,100E6,  25E8,     2]

    ]

  // which values are enumerated below for each currency type
  , set_per_currency: ['CURRENCY', 'CURRENCY_ABBREV', 'CURRENCY_PER_CHIP']
  // list of currencies and their associated values
  // each entry lists the constants in set_per_currency's order
  , currency_types: [
    // currency   $/chip
      ['funbucks', 'FB', 1]
    , ['satoshi', 'sat', 100   ]
    ]
  };
})();