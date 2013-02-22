module.exports = (function () {
  var app = require('../app')
    , session_settings = app.session_settings
    , io = require('socket.io').listen(app.server)
    , parseSignedCookies = require('connect').utils.parseSignedCookies
    , cookieParse = require( 'cookie' ).parse
    , Room = require('./rooms').Model;

  // Configure Socket.IO
  io.enable('browser client minification');  // send minified client
  io.enable('browser client etag');          // apply etag caching logic based on version number
  io.enable('browser client gzip');          // gzip the file
  io.set('log level', 1);                    // reduce logging
  io.set('transports', [                     // enable all transports (optional if you want flashsocket)
      'xhr-polling'
    , 'websocket'
    //, 'flashsocket'
    , 'htmlfile'
    , 'jsonp-polling'
  ]);
  io.set('close timeout', 30);

  io.set('authorization', function (data, cb) {
    var error = null
      , authorized = false;
    // check if there's a cookie header
    if (data.headers.cookie) {
      //console.log('data: ', data);
      // if there is, parse the cookie
      data.cookie = parseSignedCookies( cookieParse( decodeURIComponent( data.headers.cookie ) ), session_settings.secret );
      data.sessionID = data.cookie[session_settings.sid_name];
      session_settings.store.get(data.sessionID, function (err, session) {
        if ( err ) {
            error = 'Error while looking up session: ' + err
        } else if ( ! session ) {
            error = 'No session found with session ID: ' + data.sessionID;
        } else {
          // save the session data and accept the connection
          data.session = session;
          // parse the referer URL to determine which room this socket wants to join
          var host = data.headers.host
            , referer = data.headers.referer
            , url = referer.slice(referer.indexOf(host) + host.length + 1);
          data.room_id = url;
          // accept (or reject) the incoming connection
          authorized = true;
        }
        cb(error, authorized);
      });
    } else {
      // if there isn't, turn down the connection with a message
      // and leave the function.
      error = 'No cookie transmitted.';
      cb(error, authorized);
    }
  });

  io.sockets.on('connection', function(socket) {
    //console.log('A socket with sessionID ' + socket.handshake.sessionID + ' connected!');
    socket.user_id = socket.handshake.session.passport.user;

    var room_id = socket.handshake.room_id //socket.handshake = data object from authorization handler, above
      , room = Room.getRoom(room_id);
    if (room !== undefined) {
      room.join(socket);
    }
    else {
      console.error('no room with room_id', room_id);
    }
  });

  return io;
})();