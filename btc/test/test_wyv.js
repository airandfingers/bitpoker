
global._ = require('underscore') // list utility library
 require('./lib/json3.min.js')

require('./lib/tx.js');
require('./lib/bitcoinsig.js');
require('./lib/bitcoinjs-min.js');

require('./site_BTC');

console.log(site_BTC)
console.log(TX)
 // var BTC_FUNCTIONS = new site_BTC()

 //console.log(Address, getAddress, Transaction, getReceivedByTotal, subscribe);
 console.log('creating random address 1')
 var address1 = new site_BTC.Address()
console.log(address1)
console.log('creating random address 2')
var address2 = new site_BTC.Address()
console.log(address2)
var sendAmount = 0.4; var fee = 0.0001
console.log('creating transaction from address 1 to address2 sending '+sendAmount + ' with a fee of '+fee)
var transaction = new site_BTC.Transaction(address1.address, address2.address, sendAmount, fee,{callback:function(trans){console.log(trans)}})
//console.log(transaction)