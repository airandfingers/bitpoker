$('#account').on('submit', '#set_email', function(e) {
  var $set_email_form = $('#set_email')
    , email = $set_email_form.find('input[name=email]').val();
  $.post('/set_email', { email: email }, function(data) {
    console.log('set_email callback fired. email is', email);
    if (data.error) {
      console.error(data.error);
      $('#set_email_error').html(data.error);
    }
    else {
      console.log('set_email callback fired. data is', data);
      var html_append = 'email address: ' + email + '<br />' + 
                        'email confirmed: false<br />' +
                        '<form id="remove_email" action="/remove_email" method="post">' +
                            '<button class="btn btn-default btn-blue6" value="submit">Remove E-mail</button>' +
                        '</form>';
      $set_email_form.closest('div').html(html_append);
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
                            '<input type="email" name="email" placeholder="jklsemicolon@asdf.com" />' +
                            '<button class="btn btn-default btn-blue6" value="submit">Submit</button>' +
                        '</form><div id="set_email_error" class="error"></div>'
      $('#remove_email').closest('div').html(html_append);
    }
  });
  e.preventDefault();
});

$('#account').on('submit', '#set_emergency_BTC_address', function(e) {
  console.log('set_emergency_BTC_address trigger');
  var $set_address_form = $('#set_emergency_BTC_address')
    , address = $set_address_form.find('input[name=address]').val();
  $.post('/set_emergency_BTC_address', { address: address }, function(data) {
    console.log('set_emergency_BTC_address callback fired. data is', data);
    if (data.error) {
      console.error(data.error);
      $('#set_emergency_BTC_address_error').html(data.error);
    }
    else {
      var html_append = 'Emergency BTC address: ' + address + '<br />' +
                        '<form id="remove_emergency_BTC_address" action="/remove_emergency_BTC_address" method="post">' +
                            '<button class="btn btn-default btn-blue6" value="submit">Remove Emergency BTC address</button>' +
                        '</form>';
      $set_address_form.closest('div').html(html_append);
    }
  });
  e.preventDefault();
});

$('#account').on('submit', '#remove_emergency_BTC_address', function(e) {
  console.log('remove_emergency_BTC_address trigger');
  $.post('/remove_emergency_BTC_address', {}, function (data) {
    console.log('remove_emergency_BTC_address callback fired', data);
    if (data.error) {
      console.error(data.error);
    }
    else {
      console.log('remove_emergency_BTC_address callback fired');
      var html_append = '<form id="set_emergency_BTC_address" action="/set_emergency_BTC_address" method="post">' +
                            'Emergency BTC address:' +
                            '<input type="text" name="address" placeholder="1HmwtpPsAfAj9ynKh6ACaDmeztMLy2cBmT" />' +
                            '<button class="btn btn-default btn-blue6" value="submit">Save</button>' +
                        '</form><div id="set_emergency_BTC_address_error" class="error"></div>'
      $('#remove_emergency_BTC_address').closest('div').html(html_append);
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