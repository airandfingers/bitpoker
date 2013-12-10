var _ = require('underscore')
  , async = require('async')
  , remote_apis = require('../remote_apis');

remote_apis.sendTransaction('test_tx', function(send_err) {
  if (send_err) {
    console.error('Error while sending test_tx:', send_err);
    process.exit(1); // exit with error code 1
  }
  process.exit(0); // exist with no error code
});