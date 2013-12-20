var _ = require('underscore')
  , async = require('async')
  , remote_apis = require('../remote_apis')
  , site_BTC = require('./site_BTC');

var address1 = new site_BTC.Address()
  , address2 = new site_BTC.Address()
  , sendAmount = 0.4
  , fee = 0.0001;

console.log(address1, address2, sendAmount, fee);

new site_BTC.Transaction(
  address1.private
, address2.address
, sendAmount
, fee
, { testTxUnspentFetch: true
  , callback: function(transaction) {
      console.log('transaction is', transaction);
    }
  }
);
/*remote_apis.sendTransaction('test_tx', function(send_err) {
  if (send_err) {
    console.error('Error while sending test_tx:', send_err);
    process.exit(1); // exit with error code 1
  }
  process.exit(0); // exist with no error code
});*/