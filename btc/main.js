module.exports = (function () {
  var _ = require('underscore')
    , async = require('async')
    , remote_apis = require('./remote_apis');

  var createDepositAddress = function(user, cb) {
    var vault_address = '1NpMFVFNjutgY2VXGfn97WcBa1JafSVHF';
    async.waterfall([
    	function generateAddress(acb) {
    		remote_apis.createDepositAddress(user.username, vault_address, acb);
    	},
    	function setupDepositNotifications(deposit_address, acb) {
    		remote_apis.setupDepositNotificationsForAddress(deposit_address, acb);
    	}
    ], function done(err, deposit_address) {
      console.log('generateAddress and setupDepositNotifications done!', err);
    	cb(err, deposit_address);
    });
  };

  /* Handle a deposit notification from bitcoinmonitor.net, which takes the following form:
  { 
    '{"signed_data": {"userdata": "", "amount": 100000,
    "confirmations": 1, "amount_btc": "0.00100000", "address":
    "1QFnxt339786YjEFcYcJ2cDcLBEfqfN3Ke", "created": "2013-11-12
    04:39:28.473057", "txhash":
    "8a5ba61ba2a473d092dd110736bf605e6fbcedf2dc605dba423aed3635d587aa",
    "agent": "Deposit Notifier"},
    "signature" : "afe35061363f6923d4a5665f04b783b4"}': ''
  }
  parsed into:
  { signed_data: {
      userdata: '',
      amount: 50000,
      confirmations: 1,
      amount_btc: '0.00050000',
      address: '1P2tbdA6p1J1XboFEc9FtAVXUQz9ysWmqi',
      created: '2013-12-20 09:10:29.008793',
      txhash: '215d3dd569581abb11de7715f086b6b3ba02d2e2e38b346d205b266dd7b9d795',
      agent: 'Deposit Notifier'
    },
  signature: '3ae69c3252683e5e009c936121ee39f5' }
  */
  var handleDepositNotification = function(user, notification) {
    console.log('handleDepositNotification called with', user, notification);
    var deposit_address = notification.address
      , transaction_hash = notification.txhash
      , num_satoshi = notification.amount;
    async.parallel([
      function checkTransaction(acb) {
        acb();
      },
      function checkAmountReceived(acb) {
        remote_apis.checkAmountReceived(deposit_address, function(check_err, amount_received) {
          console.log('checkAmountReceived returns', check_err, amount_received);
          acb(check_err);
        });
      }
    ], function done(err) {
      console.log('checkTransaction and checkAmountReceived done!', err);
    });
  };

  return {
    createDepositAddress : createDepositAddress
  , handleDepositNotification : handleDepositNotification
  };
})();