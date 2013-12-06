require('./lib/tx.js');
require('./lib/bitcoinsig.js');
require('./lib/bitcoinjs-min.js');


//require('./lib/qrcode.js');
//require('./lib/mnemonic.js');
//require('./lib/armory.js');
//require('./lib/electrum.js');

//require('./lib/brainwallet.js');

require('./site_BTC');
var Address = site_BTC.Address
  , getAddress = site_BTC.getAddress
  , Transaction = site_BTC.Transaction
  , getReceivedByTotal = site_BTC.getReceivedByTotal
  , subscribe = site_BTC.subscribe;

 console.log(Address, getAddress, Transaction, getReceivedByTotal, subscribe);