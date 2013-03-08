module.exports = (function () {
  var app = require('./app')
    , session_settings = app.session_settings
    , io = require('socket.io').listen(app.server)
    , parseSignedCookies = require('connect').utils.parseSignedCookies
    , cookieParse = require('cookie').parse

    , _ = require('underscore');

  // Configure Socket.IO
  io.enable('browser client minification');  // send minified client
  io.enable('browser client etag');          // apply etag caching logic based on version number
  io.enable('browser client gzip');          // gzip the file
  io.set('log level', 1);                    // reduce logging
  io.set('transports', [                     // enable all transports (optional if you want flashsocket)
      'websocket'
    , 'xhr-polling'
    //, 'flashsocket'
    , 'htmlfile'
    , 'jsonp-polling'
  ]);
  io.set('close timeout', 30);

  //authorization handler - 
  io.set('authorization', function (data, cb) {
    var error = null
      , authorized = false;
    // check if there's a cookie header
    if (data.headers.cookie) {
      //console.log('data: ', data);
      // if there is, parse the cookie
      data.cookie = parseSignedCookies( cookieParse( decodeURIComponent( data.headers.cookie ) ), session_settings.secret );
      data.sessionID = data.cookie[session_settings.sid_name];
      if (session_settings.store.getCollection() === null) {
        error = 'Session store isn\'t ready yet.';
        cb(error, authorized);
      }
      else {
        session_settings.store.get(data.sessionID, onSessionLookup);
      }        
    } else {
      // if there isn't, turn down the connection with a message
      // and leave the function.
      error = 'No cookie transmitted.';
      cb(error, authorized);
    }

    function onSessionLookup(err, session) {
      if (err) {
          error = 'Error while looking up session: ' + err
      } else if (! session) {
          error = 'No session found with session ID: ' + data.sessionID;
      } else {
        // save the session data and accept the connection
        data.session = session;
        // parse the referer URL to determine which site this socket originates from
        var host = data.headers.host
          , referer = data.headers.referer
          , url = referer.slice(referer.indexOf(host) + host.length + 1); // get everything after
                                                                    //[protocol]://[host]:[port]/
        data.room_id = url;
        // accept (or reject) the incoming connection
        authorized = true;
      }
      cb(error, authorized);
    };
  });

  io.bindMessageHandlers = function(socket, messages) {
    var self = this;
    if (! _.isObject(self)) { console.error('no context object given!'); return; }
    _.each(messages, function(how_to_handle, message_name) {
      var handler_name = how_to_handle.handler
        , handler = self[handler_name];
      if (! _.isFunction(handler)) {
        console.error('context object has no function', handler_name);
        return;
      }
      socket.on(message_name, function() {
        if (how_to_handle.pass_message_name !== true && how_to_handle.pass_socket !== true) {
          //console.log('calling instance\'s', handler_name, 'with', arguments);
          handler.apply(self, arguments);
        }
        else {
          //add socket or message_name to front of arguments list
          var arg_to_add = how_to_handle.pass_socket ? socket : message_name
            , argsArray = [].slice.apply(arguments);
          argsArray.unshift(arg_to_add);
          //console.log('calling instance\'s', handler_name, 'with', argsArray);
          handler.apply(self, argsArray);
        }
      });
    });
  }

  return io;
})();