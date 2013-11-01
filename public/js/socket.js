var socket = io.connect(window.location.origin, {
  transports: [
    'websocket'
  , 'xhr-multipart'
  , 'htmlfile'
  , 'xhr-polling'
  ]
});