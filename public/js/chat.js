var socket = io.connect(window.location.origin, {
  transports: [
    'websocket'
  , 'xhr-multipart'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
  ]
})
  , $chat_form = $('#chat_form')
  , $chat_sender = $('#chat_sender')
  , $chat_message = $('#chat_message')
  , chat_message_template = 
    '<p id="new_message">' +
      '<strong><%= sender %> : </strong>' +
      '<span><%= message %></span>' +
    '</p>';

var emit = socket.emit;
socket.emit = function() {
  console.log('Sending message:', Array.prototype.slice.call(arguments));
  emit.apply(socket, arguments);
};

var $emit = socket.$emit;
socket.$emit = function() {
  console.log('Message received:', Array.prototype.slice.call(arguments));
  $emit.apply(socket, arguments);
};

$chat_message.focus();

socket.on('user_chats', function(data) {
  console.log('user_chats message received: ', data);
  var sender = data.sender
    , message = data.message
    , $message = $(_.template(chat_message_template, { sender: sender, message: message }));
  $('#chat_messages')
    .append($message)
    .scrollTop($('#chat_messages').height());
  $('#new_message')
    .effect('highlight', {color: 'chartreuse'}, 4000)
    .removeAttr('id');
});

$chat_form.submit(function(e) {
  e.stopPropagation();
  e.preventDefault();
  var data = {
    sender: $chat_sender.val()
  , message: $chat_message.val()
  };
  $chat_message.val('');
  console.log('Emitting message', 'chat', data);
  socket.emit('chat', data);
});

$(document).on('keydown', function(e) {
  if ($(':focus').is('input')) {
      //don't focus $chat_message if the user's typing in a text field
      return;
  }
  else {
      $chat_message.focus();
  }
});

//Display initial user list.
  console.log("Pre-Displaying initial user list: printing ", $("#server_values").data("room_state").users);
  for (var i=0, len = $("#server_values").data("room_state").users.length; i < len; i++) {
    var initial_user = $("#server_values").data("room_state").users[i];
    if ($("#" + initial_user).length == 0) {
      $("#users > ul").append("<li id="+ initial_user +">"+ initial_user + "</li>");
      console.log("adding " + initial_user+ " to the initial users list.");
    }    
  }

//Socket.on like function that takes user joins and user leaves and updates the user list.
socket.on('user_joins', function(user) {
  //jquery add this thingy to dom user.username
  //if there is not already a user named __ in the chat, add them.
    if ($("#" + user.username).length == 0) {
      $("#users > ul").append("<li id="+ user.username +">"+ user.username + "</li>");
      console.log("adding " + user.username + " to the users list.");
    }
});

socket.on('user_leaves', function(user) {
  //jquery remove this thingy from dom user.username
  console.log("removing " + user.username + " from the users list.");
  $("#" + user.username).detach();
});