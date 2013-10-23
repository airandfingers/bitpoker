$('#account').on('submit', '#set_email', function(e) {
	console.log('set_email trigger');
  var email = $('#set_email').find('input[name=email]').val();
  $.post('/set_email', {email: email}, function (data) {
    console.log('set_email callback fired. email is', email);
    if (data.error) {
      console.error(data.error);
      $('#set_email_error').html(data.error);
    }
    else {
      console.log('set_email callback fired. data is', data);
      var html_append = 'email address: ' + email + '<br />email confirmed: false <br /><form id="remove_email" action="/remove_email" method="post"><button class="btn btn-inverse" value="submit"> Remove E-mail </button></form>'
      $('#set_email').parents('div:eq(0)').html(html_append);
    }
  });
	e.preventDefault();
});

$('#account').on('submit', '#remove_email', function(e) {
	console.log('remove_email trigger');
  $.post('/remove_email', {}, function (data) {
    console.log('remove_email callback fired', data);
    if (data.error) {
      console.error(data.error);
    }
    else {
      console.log('remove_email callback fired');
      var html_append = '<form id="set_email" action="/set_email" method="post">' +
                    'email address:' +
                    '<input field="text" name="email" placeholder="jklsemicolon@asdf.com" />' +
                    '<button class="btn btn-inverse" value="submit"> Submit </button>' +
                '</form>'
      $('#remove_email').parents('div:eq(0)').html(html_append);
    }
  });
	e.preventDefault();
});

$('#increase_funbucks').submit(function increase_funbucks_by_100 (e) {
	console.log('increase funbucks trigger');
  $.post('/increase_funbucks_by_100', {}, function (data) {
    console.log('increase funbucks by 100 route fired');
    if (data.error) {
      console.error(data.error);
    }
    else {
      console.log('funbucks value is now ' + data.funbucks);
      $('#funbucks_counter').text(data.funbucks);
    }
  });
	e.preventDefault();
});

$('#delete_account').submit(function delete_account (e) {
	console.log('delete account trigger');
});