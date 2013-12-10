module.exports = (function () {
  var _ = require('underscore')
    , db_config = require('../models/db.config')
    , request = require('request'); // HTTP/HTTPS request library

  var createDepositAddress = function(username, vault_address, cb) {
    var url = 'https://blockchain.info/api/receive?method=create' +
      '&address=' + vault_address +
      '&shared=false' +
      '&callback=https://bitcoin-poker-7793.onmodulus.net/bitcoin_deposit/' + username
      , error = null;
    request({
      url: url
    }, function(err, response) {
      if (err) {
        error = 'Error while creating deposit address: ' + err.message;
        console.error(error);
      }
      else if (! err && response &&
               response.statusCode !== 200 &&
               response.statusCode !== 201) {
        error = 'Unsuccessful response code while creating deposit address: ' + response.statusCode
      }
      if (error) {
        console.error(error);
        return cb(error);
      }
      var body = JSON.parse(response.body);
      deposit_address = body.input_address;
      cb(null, deposit_address);
    });
  };

  var setupDepositNotificationsForAddress = function(address, cb) {
    console.log('setupDepositNotificationsForAddress called with', address);
    // add this address to our agent's watched addresses
    var url = 'http://www.bitcoinmonitor.net/api/v1/agent/' + db_config.BITCOIN_MONITOR_AGENT_ID + '/address/'
      , form_data = {
          address: address
        };
    console.log('url:', url, ', form_data:', form_data);
    request({
      url: url
    , form: form_data
    , method: 'POST'
    , headers: { Authorization: db_config.BITCOIN_MONITOR_API_KEY }
    }, function(request_err, response) {
      if (! request_err && response &&
          response.statusCode !== 200 &&
          response.statusCode !== 201) {
        console.error(response.statusCode, 'response.body: ', response.body);
        request_err = new Error('Unsuccessful response code:' + response.statusCode);
      }
      if (request_err) {
        console.error('Error while setting deposit callback:', request_err);
      }
      //console.log('Deposit notification set for', address);
      if (_.isFunction(cb)) { cb(request_err, address); }
    });
  };

  var checkAmountReceived = function(address, cb) {
    console.log('checkAmountReceived called with', address, cb);
    var url = 'https://blockchain.info/q/getreceivedbyaddress/' + address;
    request(url, function(request_err, response, body) {
      if (! request_err && response &&
          response.statusCode !== 200 &&
          response.statusCode !== 201) {
        request_err = new Error('Unsuccessful response code:' + response.statusCode);
      }
      if (request_err) {
        console.error('Error while setting checking amount received:', request_err);
        return cb(request_err);
      }
      var body = JSON.parse(response.body);
      console.log('Received response from blockchain:', body);
      cb(null, body);
    });
  };

  var sendTransaction = function(raw_tx, cb) {
    console.log('sendTransaction called with', raw_tx);
    // submit the transaction to blockchain.info's /pushtx route
    var url = 'https://blockchain.info/pushtx'
      , form_data = {
          tx: raw_tx
        };
    console.log('url:', url, ', form_data:', form_data);
    request({
      url: url
    , form: form_data
    , method: 'POST'
    }, function(request_err, response) {
      console.log('Calling', url, 'with', form_data, 'yields', request_err, response.body);
      if (! request_err && response &&
          response.statusCode !== 200 &&
          response.statusCode !== 201) {
        console.error(response.statusCode, 'response.body: ', response.body);
        request_err = new Error('Unsuccessful response code:' + response.statusCode);
      }
      if (request_err) {
        console.error('Error while sending raw transaction:', request_err);
      }
      if (_.isFunction(cb)) { cb(request_err); }
    });
  };

  var verifyTransaction = function() {

  };

  return {
    createDepositAddress: createDepositAddress,
    setupDepositNotificationsForAddress: setupDepositNotificationsForAddress,
    checkAmountReceived: checkAmountReceived,
    sendTransaction: sendTransaction
  };
})();