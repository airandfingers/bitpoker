module.exports = (function () {
var moment = require('moment')
var _ = require('underscore')
var mongoose = require('mongoose')
var db = require('./db')

 var hoursPerLottery = (1/60)/5
var LOTTERY_INTERVAL = hoursPerLottery*60*60*100 
var INTERVAL_MARGIN_OF_ERROR = 1000 //implement later

console.log(db)

var LotterySchema = new mongoose.Schema({

    start              : { type: Date, default: function(){return new Date()} }
    ,end               : { type: Date, default: function(){return moment(new Date()).add('ms', LOTTERY_INTERVAL).toDate()}}
    ,entries           :  {type:mongoose.Schema.Types.Mixed, default: function(){return{}} }
    ,winning_username  :  {type: String}


  }, { minimize: false }); // set minimize to false to save empty objects



  LotterySchema.methods.addEntry = function(userInfo, cb) {
var lottery = this
console.log('lottery.addentry called for username '+userInfo.username)

if(!lottery.running){cb('lottery not running');return}

if(lottery.entries[userInfo.username]){return cb('entry already exists')}
else{ 
  console.log('user has not entered yet')
  lottery.entries[userInfo.username] = {
address:userInfo.address
,email:userInfo.email
  }
 // console.log(lottery.entries)
 // lottery.markModified('entries')
  lottery.markModified('entries.'+userInfo.username)
  lottery.save(function(err, lottery){
if(err){return console.error(err)}
else if(lottery){
  //console.log(userInfo.username + ' entered into the lottery')
  console.log(lottery)
  cb(null, lottery)
}
   })//save

}//end of searching through to find if already have an entry

  }//add entry

    LotterySchema.virtual('decided').get(function(){
     // console.log('getting virtual property decided')
     // console.log(this)
      var now = moment()
if(_.isString(this.winning_username ) && this.winning_username != ''){
console.log('lottery decided by virtue of winning_username: ' + this.winning_username)
  return true
}
  //if over and no entries
  else if(_.isEmpty(this.entries) && (moment(this.end).isBefore(now) || moment(this.end).isSame(now))){
//console.log('lottery decided by virtue of is empty:' + _.isEmpty(this.entries))
//console.log(this.entries)
    return true}
  else{return false}

    })

    LotterySchema.virtual('running').get(function(){

var now = moment()

if(moment(this.start).isBefore(now) && now.isBefore(moment(this.end))){return true}
  else{return false}

    })


LotterySchema.virtual('remaining').get(function(){

var remaining = moment(this.end).diff(moment())
return remaining

})



  LotterySchema.methods.pickWinner = function(cb) {
    var lottery = this

//console.log('pickwinner called on ' + this['_id'] + ', running = '  +lottery.running)
console.log(this)

    if(lottery.running){return cb(null, null)} 
    else if(lottery.decided){
//console.log('lottery already decided')
//console.log(lottery.entries)
      return cb(null, null)}

console.log('determing winner ...')

var numEntries = _.size(lottery.entries)
var entryArray = _.toArray(lottery.entries)
var winningIndex = Math.random(numEntries)

var winnerInfo = entryArray[winningIndex]

var winning_username = winnerInfo.username

lottery.winning_username = winning_username

lottery.save(function(err, lottery){
if(err){return console.error(err)}
else{

console.log('winner is: '   + winning_username)
cb(null, winnerInfo)

}
})


  }//finish the lottery

  LotterySchema.methods.setTimeout = function(cb) {

//if(!cb){var cb = function(err, res){}}

if(!cb){var cb = function(err, winnerInfo){

if(err){return console.error('error')}
  else {Lottery.create()}

}}

var id = this['_id']

//console.log('setting 1 timeout')
var timer = setTimeout(function(){
  //first get current lottery
Lottery.findById(id, function (err, lottery) {
  if(err){return console.error(err)}
else if(!lottery){return console.error('no lottery found with id = ' +id)}
  console.log('findById successfully')
  lottery.pickWinner(cb)
});

}, this.remaining + INTERVAL_MARGIN_OF_ERROR)

return timer

  }//finish the lottery


 LotterySchema.statics.setTimeouts = function(cb) {

  this.find({end: { $lte : new Date() } })
  .where('decided').equals(false)
  .exec (function(err, lotteries){

_.each(lotteries, function(lottery, index, lotteryArray){

lottery.setTimeout()

})


  } )

 }//activates timeouts on all uncompleted lotteries

  LotterySchema.statics.current = function(cb) {
//console.log('lottery.current called')
this.findOne({end: { $gt : new Date() }}, function(err, lottery){
//console.log(lottery)
if(err){return console.error(error)}
  else{
   // console.log('lottery.current returning a', lottery)
    return cb(err, lottery)
  }

})


  }//get the currenttly OPEN lottery


  LotterySchema.statics.create = function(cb) {


this.current(function(err, currentLottery){

if(currentLottery){return cb('tried to create lottery when there is already a lottery in progress', currentLottery)}
else {var currentLottery = new Lottery()}
currentLottery.save(function(err, lottery){

if(err){return console.error(err)}
else{
 // console.log('lottery successfully created')
  lottery.setTimeout()
if(cb){cb(err, lottery)}
}

})

})



  }//create a new lottery


var Lottery = mongoose.model('Lottery', LotterySchema);


  return Lottery
 })();