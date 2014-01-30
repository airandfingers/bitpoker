module.exports = (function () {
var moment = require('moment')
var _ = require('underscore')
var mongoose = require('mongoose')
var db = require('./db')

 var hoursPerLottery = 0.05
LOTTERY_INTERVAL = hoursPerLottery*60*60*100; // 1 second

console.log(db)

var LotterySchema = new mongoose.Schema({

    start           : { type: Date, default: function(){return new Date()} }
    ,end            : { type: Date, default: function(){return moment(new Date()).add('ms', LOTTERY_INTERVAL).toDate()}}
    ,entries        :  mongoose.Schema.Types.Mixed
    ,winning_username  :  {type: mongoose.Schema.Types.Mixed, default: null}

  }, { minimize: false }); // set minimize to false to save empty objects


//doc.markModified()
  LotterySchema.methods.addEntry = function(userInfo, cb) {

this.findOne({'entries.username':userInfo.username}, function(err, lottery){

if(err){cb(err);return}
  else if(lottery){cb('entry already exists', null);return}
  else if(moment()/*current moment*/.isBefore(lottery.end) != true ){//check if ended
    cb('lottery already ended');return  
  }//if past lottery end time
else{ 
  lottery.entries.username = userInfo.username
  lottery.entries.address = userInfo.address
  lottery.entries.email = userInfo.email
  lottery.entry.save(function(err){
return console.error(err)
cb(null)
   })
  }//if valid entry
 

})//end of searching through to find if already have an entry

  }//add entry

LotterySchema.static.getTimeRemaining = function() {

console.log('getTimeRemaining called')
console.log(this)

return moment(this.end).diff(moment())

  }//finish the lottery


  LotterySchema.static.end = function(cb) {

this.findOne({'entries':1}, function(err, lottery){

var numEntries = _.size(lottery)
if(numEntries <= 0){cb('no entries in the lottery')}

var entryArray = _.toArray(lottery)
var winningIndex = Math.random(numEntries)

var winnerInfo = entryArray[winningIndex]

cb(null, winnerInfo)

})//find the entries

  }//finish the lottery



var Lottery = mongoose.model('Lottery', LotterySchema);

/*

db.collectionNames('lottery', function (err, names) {
  // names contains an array of objects that contain the collection names
  if(names.length>0)return;
  else{
    
  }//if we need to create 
  a}
});

*/

  return Lottery
 })();