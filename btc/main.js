module.exports = (function () {
  var _ = require('underscore')
    , async = require('async')
    , remote_apis = require('./remote_apis');

  var createDepositAddress = function(user, cb) {
    var vault_address = '1NpMFVFNjutgY2VXGfn97WcBa1JafSVHF';
    async.waterfall([
    	function generateAddress(acb) {
        // TODO: replace this logic with a local method for creating addresses
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
  */
  var handleDepositNotification = function(user, notification) {
    console.log('handleDepositNotification called with', user, notification);
    // TODO: check signature? notification.signed_data vs notification.signature
    var deposit_address = notification.address
      , transaction_hash = notification.txhash
      , num_satoshi = notification.amount;
    async.parallel([
      function checkTransaction(acb) {
        acb();
      },
      function checkAmountReceived(acb) {
        remote_apis.checkAmountReceived(this.deposit_address, function(check_err, amount_received) {
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