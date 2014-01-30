module.exports = (function () {
  // define some variables local to this file
  var lottery_entries = []
    , LOTTERY_INTERVAL = 24*60*60*100; // 1 second

var getTimeRemaining = function(){
var lotteryEndHour = 0
var date = new Date()
var currentHour = date.getHours()
var currentMinutes = date.getMinutes()
var remainingMS = LOTTERY_INTERVAL - (currentHour*60 + currentMinutes)*60*100

return remainingMS
}//getTimeRemaining

var getWinner = function(){



}

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