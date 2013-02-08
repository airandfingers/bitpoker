module.exports = function (server, session_settings) {
  var io = require('socket.io').listen(server)
    , parseSignedCookies = require('connect').utils.parseSignedCookies
    , cookieParse = require( 'cookie' ).parse;

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

  io.set('authorization', function (data, accept) {
    // check if there's a cookie header
    if (data.headers.cookie) {
      //console.log('data: ', data);
      // if there is, parse the cookie
      data.cookie = parseSignedCookies( cookieParse( decodeURIComponent( data.headers.cookie ) ), session_settings.secret );
      data.sessionID = data.cookie[session_settings.sid_name];
      session_settings.store.get(data.sessionID, function (err, session) {
        if (err || !session) {
          console.log('get returns', err, session);
          // if we cannot grab a session, turn down the connection
          accept('Error', false);
        } else {
          // save the session data and accept the connection
          data.session = session;
          accept(null, true);
        }
      });
    } else {
      // if there isn't, turn down the connection with a message
      // and leave the function.
      return accept('No cookie transmitted.', false);
    }
    // accept the incoming connection
    accept(null, true);
  });

  io.sockets.on('connection', function(socket) {
    //console.log('A socket with sessionID ' + socket.handshake.sessionID + ' connected!');
    socket.emit('syn ack');

    socket.on('ack', function () {
      console.log('Ack received.');
    });

    socket.on('joinRoom', function(data) {
      console.log('joinRoom message received:', data);
      socket.join(data.room);
    })

    socket.on('chatMessage', function(data) {
      console.log('Emitting message', 'chatMessage', data);
      io.sockets.in(data.room).emit('chatMessage', data);
    });
  });
};