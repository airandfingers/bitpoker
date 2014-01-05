// Wrap everything in an immediately-invoked function, to scope variables
(function() {
  // Require dependencies
  var express = require('express')
    , http = require('http')
    , https = require('https')
    , passport = require('passport')
    , flash = require('connect-flash')
    , fs = require('fs');

  // Define how to format log messages
  var logger_options = function(tokens, req, res) {
    var status = res.statusCode
      , color = 32;

    if (status >= 500) color = 31
    else if (status >= 400) color = 33
    else if (status >= 300) color = 36;

    return '\033[90m' + req.method
      + ' ' + req.headers.host+ req.originalUrl + ' '
      + '\033[' + color + 'm' + res.statusCode
      + ' \033[90m'
      + (new Date - req._startTime)
      + 'ms\033[0m';
  };

  // Create an Express app and an HTTP server
  var http_app = express()
    , http_server = http.createServer(http_app);
  // Create an Express app and an HTTPS server
  var app = module.exports = express()
    , key  = fs.readFileSync('keys/key.pem', 'utf8')
    , cert = fs.readFileSync('keys/cert.pem', 'utf8')
    , credentials = { key: key, cert: cert }
    , server = https.createServer(credentials, app)
  // Define some session-related settings
    , db = require('./models/db')
    , session_settings = {
        store: db.session_store
      , secret: db.SESSION_SECRET
      , sid_name: 'express.sid'
      , cookie: { maxAge: 3600000 } // 1 hour
    };
  //console.log('session_settings', session_settings);
  console.log('starting up.. node version is', process.versions.node);

  // set up HTTP forwarder
  http_app.use(function(req, res, next) {
    res.redirect('https://' + req.headers.host + req.url);
  });

  // export some variables to be used by other files (routes, sockets, ?)
  module.exports = {
    app: app
  , server: server
  , session_settings: session_settings
  };

  // Set some Express settings
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');

  // Define which middleware the Express app should use
  // (and what order to apply them in)
  app.use(express.logger(logger_options)); // Log each request
  app.use(express.urlencoded()); // Parse POST options into req.body (application/x-www-form-urlencoded)
  app.use(express.bodyParser()); // Parse POST options into req.body (application/json)
  app.use(express.static(__dirname + '/public')); // Serve files found in the public directory
  app.use(express.cookieParser()); // Parse cookie into req.session
  app.use(express.session({
    store: session_settings.store, //where to store sessions
    secret: session_settings.secret, //seed used to randomize some aspect of sessions?
    key: session_settings.sid_name, //the name under which the session ID will be stored
    cookie: session_settings.cookie // dictates how long the cookie will last
  })); //enable session use with these settings
  app.use(passport.initialize()); // Initialize Passport authentication module
  app.use(passport.session()); // Set up Passport session
  app.use(function(req, res, next) {
    // Copy username from req.user into res.locals for use in views
    res.locals.username = req.user && req.user.username;
    next();
  });
  app.use(flash()); // Necessary to display Passport "flash" messages
  app.use(app.router); // Match against routes in routes.js

  //Development-mode-specific middleware configuration
  app.configure('development', function() {
    // Display "noisy" errors - show exceptions and stack traces
    app.use(express.errorHandler({
      dumpExceptions: true
    , showStack: true
    })); 
  });

  //Production-mode-specific middleware configuration
  app.configure('production', function() {
    // Display "quiet" errors - no exceptions or stack traces
    app.use(express.errorHandler());
  });

  // Define routes that the app responds to
  require('./routes');

  // Define Socket.IO messaging
  require('./sockets');

  //tell this server to listen on port X.
  //thus, this server is accessible at the URL:
  //  [hostname]:X
  //where [hostname] is the IP address of our server, or any domains pointed at our server
  http_server.listen(80);
  console.log('http_server listening on port %d in %s mode',
              http_server.address().port, app.settings.env);

  server.listen(443);
  console.log('server listening on port %d in %s mode',
              server.address().port, app.settings.env);
})();