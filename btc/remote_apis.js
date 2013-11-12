module.exports = (function () {
  var db_config = require('../models/db.config')
    , request = require('request'); // HTTP/HTTPS request library

  function setupDepositNotificationsForAddress(address) {
    console.log('setupDepositNotificationsForAddress called with', address);
    // add this address to our agent's watched addresses
    var url = 'http://www.bitcoinmonitor.net/api/v1/agent/' +
              db_config.BITCOIN_MONITOR_AGENT_ID + '/' +
              address + '/';
    console.log('url:', url, ', headers:', { Authorization: db_config.BITCOIN_MONITOR_API_KEY });
    request({
      url: url
    , method: 'POST'
    , headers: { Authorization: db_config.BITCOIN_MONITOR_API_KEY }
    }, function(request_err, response, body) {
      if (! request_err && response &&
          response.statusCode !== 200 &&
          response.statusCode !== 201) {
        request_err = new Error('Unsuccessful response code:' + response.statusCode);
      }
      if (request_err) {
        console.error('Error while setting deposit callback:', request_err);
        return;
      }
      var body = JSON.parse(response.body);
      console.log('Received response from bitcoinmonitor:', body);
    }); 
  }

  function checkAmountReceived(address, cb) {
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
  }

  function sendTransaction() {

  }

  function verifyTransaction() {

  }

  return {
    setupDepositNotificationsForAddress: setupDepositNotificationsForAddress,
    checkAmountReceived: checkAmountReceived
  };
})();