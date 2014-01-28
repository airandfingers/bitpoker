module.exports = (function () {
  // define some variables local to this file
  var lottery_entries = []
    , LOTTERY_INTERVAL = 1000; // 1 second

  //stub "drawing" code, occuring at intervals after server starts
  setInterval(function() {
  	console.log('And the winner is...', lottery_entries[0]);
  }, LOTTERY_INTERVAL);

  function enterLottery(user) {
  	console.log('lottery.js:enterLottery called for', user.username);
  }

  return {
  	enterLottery: enterLottery
  };
 })();