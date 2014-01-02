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
    userdata: '',
    amount: 50000,
    confirmations: 1,
    amount_btc: '0.00050000',
    address: '1P2tbdA6p1J1XboFEc9FtAVXUQz9ysWmqi',
    created: '2013-12-20 09:10:29.008793',
    txhash: '215d3dd569581abb11de7715f086b6b3ba02d2e2e38b346d205b266dd7b9d795',
    agent: 'Deposit Notifier'
  },
  */
  var handleDepositNotification = function(user, notification_data) {
    console.log('handleDepositNotification_data called with', user, notification_data);
    var deposit_address = notification_data.address
      , transaction_hash = notification_data.txhash
      , deposit_amount = notification_data.amount;
    async.waterfall([
      function checkTransaction(acb) {
        remote_apis.checkTransaction(transaction_hash, deposit_address, acb);
      },
      function checkUserBalance(acb) {
        user.checkBalance('satoshi', acb);
      },
      function updateUserBalance(balance_in_satoshi, acb) {
        var new_satoshi = balance_in_satoshi + deposit_amount
          , transaction = {
              type: 'deposit'
            , amount: deposit_amount
            , tx_hash: transaction_hash
            , timestamp: new Date()
        };
        user.updateBalance('satoshi', new_satoshi, transaction, acb);
      },
      function notifyUserSockets(new_satoshi, acb) {
        user.broadcastBalanceUpdate('satoshi', new_satoshi);
      }
    ], function done(err) {
      if (err) { console.error('Error in handleDepositNotification:', err); }
    });
  };

  /* Handle a withdraw request made to /withdraw_bitcoins, with a body that takes the following form:
  {
    amount '100000',
    withdraw_address: '1P2tbdA6p1J1XboFEc9FtAVXUQz9ysWmqi',
  },
  */
  var withdraw_fee = 0.0001 * 1E8
    // used for server issues (anything other than invalid user input)
    , generic_error = 'Sorry, something went wrong while withdrawing your satoshi.'
    // minimum allowed withdrawl
    , minimum_withdraw_amount = withdraw_fee * 2;
  var handleWithdrawRequest = function(user, body, cb) {
    var withdraw_amount = body.amount * 1E8
      , withdraw_address = body.withdraw_address
      , error;
    // validate amount
    async.waterfall([
      function checkAgainstMinimum(acb) {
        if (withdraw_amount < minimum_withdraw_amount) {
          error = 'Sorry, you may not withdraw amounts less than ' + minimum_withdraw_amount + ' satoshi';
        }
        acb(error);
      },
      function checkAgainstBalance(acb) {
        user.checkBalance('satoshi', function(check_err, balance_in_satoshi) {
          if (check_err) {
            console.error('Error while looking up bitcoin balance: ', check_err);
            error = generic_error;
          }
          else if (withdraw_amount > balance_in_satoshi) {
            error = 'You can\'t withdraw ' + withdraw_amount + ' satoshi when you only have ' + balance_in_satoshi;
          }
          acb(error, balance_in_satoshi);
        });
      },
      function sendTransaction(balance_in_satoshi, acb) {
        remote_apis.sendTransaction(withdraw_address, withdraw_amount, withdraw_fee, function(send_err, tx_hash) {
          if (send_err) {
            console.error('Error while sending transaction:', send_err);
            error = generic_error;
          }
          acb(error, balance_in_satoshi, tx_hash);
        });
      },
      function updateBalance(balance_in_satoshi, tx_hash, acb) {
        var new_satoshi = balance_in_satoshi - withdraw_amount
          , transaction = {
              type: 'withdrawl'
            , amount: withdraw_amount
            , tx_hash: tx_hash
            , timestamp: new Date()
        };
        user.updateBalance('satoshi', new_satoshi, transaction, function(update_err) {
          if (update_err) {
            console.error('Error while updating satoshi balance:' + update_err);
            error = generic_error
          }
          acb(error, new_satoshi);
        });
      },
      function notifySockets(new_satoshi, acb) {
        user.broadcastBalanceUpdate('satoshi', new_satoshi);
        acb();
      }
    ], function done(err) {
      if (err) { console.error('Error in handleWithdrawRequest:', err); }
      cb(err);
    });
  };

  return {
    createDepositAddress: createDepositAddress
  , handleDepositNotification: handleDepositNotification
  , handleWithdrawRequest: handleWithdrawRequest
  };
})();