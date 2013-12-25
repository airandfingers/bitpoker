
//global._ = require('underscore') // list utility library
// require('./lib/json3.min.js')

var site_BTC = require('./site_BTC');

//console.log(site_BTC)
//console.log(TX)
 // var BTC_FUNCTIONS = new site_BTC()

 //console.log(Address, getAddress, Transaction, getReceivedByTotal, subscribe);
 /*
 console.log('creating random address 1')
 var address1 = new site_BTC.Address()
console.log(address1)
console.log('creating random address 2')
var address2 = new site_BTC.Address()
console.log(address2)
var sendAmount = 0.4; var fee = 0.0001

console.log('creating transaction from address 1 to address2 sending '+sendAmount + ' with a fee of '+fee)
var transaction = new site_BTC.Transaction(address1.private, address2.address, sendAmount, fee,{testTxUnspentFetch:true, callback:function(trans){console.log(trans)}})
//console.log(transaction)
*/

var amountInBTC =  0.0011; var feeInBTC = 0.0001//0.0001
var sendToAddress = '1G1WggkFkb5vcQx6WBMFHimbLFpuyXKtV7'

console.log('creating transaction from address 1 to address2 sending ')
var transaction = new site_BTC.Transaction('5Ht6Sx nByi4U H4GJdb 4NtvqK ivBdT7 Nw9Qdc eDEtS3 a861Dv JWb', 
	sendToAddress, amountInBTC, feeInBTC,{callback:function(trans){console.log(trans)}})
