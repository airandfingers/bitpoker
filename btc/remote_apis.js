module.exports = (function () {
  var _ = require('underscore')
    , db_config = require('../models/db.config')
    , request = require('request'); // HTTP/HTTPS request library

  function setupDepositNotificationsForAddress(address, cb) {
    console.log('setupDepositNotificationsForAddress called with', address);
    // add this address to our agent's watched addresses
    var url = 'http://www.bitcoinmonitor.net/api/v1/agent/'
      , form_data = {
          addresses: address
        , watch_type: 1
        , name: address
        };
    //console.log('url:', url, ', form_data:', form_data);
    request({
      url: url
    , form: form_data
    , method: 'POST'
    , headers: { Authorization: db_config.BITCOIN_MONITOR_API_KEY }
    }, function(request_err, response) {
      var body = JSON.parse(response.body);
      if (! request_err && response &&
          response.statusCode !== 200 &&
          response.statusCode !== 201) {
        console.error(response.statusCode, 'response: ', body);
        request_err = new Error('Unsuccessful response code:' + response.statusCode);
      }
      if (request_err) {
        console.error('Error while setting deposit callback:', request_err);
        if (_.isFunction(cb)) { cb(request_err); }
        return;
      }
      //console.log('Deposit notification set for', address);
      if (_.isFunction(cb)) { cb(null, body.id) }
      return;
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