var lottery = require('./models/lottery')
var moment = require('moment')
var _ = require('underscore')
var mongoose = require('mongoose')
var db = require('./models/db')



  //stub "drawing" code, occuring at intervals after server starts
  setInterval(function() {
    console.log('And the winner is...');
  }, LOTTERY_INTERVAL);

  function enterLottery(user) {
    console.log('lottery.js:enterLottery called for', user.username);
  }