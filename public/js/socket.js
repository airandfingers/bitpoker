var socket = io.connect(window.location.origin, {
  transports: [
    'websocket'
  , 'xhr-multipart'
  , 'htmlfile'
  , 'xhr-polling'
  ]
});

var emit = socket.emit;
socket.emit = function() {
  console.error('Sending message:', Array.prototype.slice.call(arguments));
  emit.apply(socket, arguments);
};

var $emit = socket.$emit;
socket.$emit = function() {
  console.error('Message received:', Array.prototype.slice.call(arguments));
  $emit.apply(socket, arguments);
};