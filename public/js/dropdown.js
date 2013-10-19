<!-- Hide/Show Login functionality -->
var $login = $('#login');
$(function() {
  $login.hide();
  $('#login_trigger').click(function(e) {
    $login.stop(true, true);
    if (! $(this).hasClass('active')) {

      // remove active class from register & hide it.
      $('#register_trigger')
        .removeClass('active');
      $register
        .hide('slide', { direction: 'up' }, 500);

      // add active class
      $(this)
        .addClass('active');
      // hide login form
      $login
        .css({
          left: $(this).position().left - $(this).width()
        , top: $(this).position().top + $(this).height()
        })
        .show('slide', { direction: 'up' }, 500)
        .find('input:first').focus();
    }
    else {
      // remove active class
      $(this)
        .removeClass('active');
      // hide login form
      $login
        .hide('slide', { direction: 'up' }, 500);
    }
  });

  $login.find('form :submit').click(function() {
    $(this)
      .parent()
      .prev('a')
      .click();
    });
});

<!-- Hide/Show Register functionality -->
var $register = $('#register');
$(function() {
  $register.hide();
  $('#register_trigger').click(function() {
    $register.stop(true, true);
    if (! $(this).hasClass('active')) {

      // remove active class from login & hide it.
      $('#login_trigger')
        .removeClass('active');
      $login
        .hide('slide', { direction: 'up' }, 500);

      // add active class
      $(this)
        .addClass('active');
      // hide register form
      $register
        .css({
          left: $(this).position().left - $(this).width() - 20
        , top: $(this).position().top + $(this).height()
        })
        .show('slide', { direction: 'up' }, 500)
        .find('input:first').focus();
    }
    else {
      // remove active class
      $(this)
        .removeClass('active');
      // hide register form
      $register
        .hide('slide', { direction: 'up' }, 500);
    }
  });
  $register.find('form :submit').click(function() {
    $(this)
      .parent()
      .prev('a')
      .click();
    });
});

<!-- Hide/Show Bugs/Feedback functionality -->
var $report_bug = $('#report_bug');
$(function() {
  // on page load
  $report_bug.hide();
  $('#report_bug_trigger').click(function() {
    $report_bug.stop(true, true);
    if (! $(this).hasClass('active')) {
      // add active class
      $(this)
        .addClass('active');
      // hide report_bug form
      $report_bug
        .css({
          left: $(this).position().left - 20
        , top: $(this).position().top + $(this).height()
        })
        .show('slide', { direction: 'up' }, 500)
        .find('input:first').focus();
    }
    else {
      // remove active class
      $(this)
        .removeClass('active');
      // hide report_bug form
      $report_bug
        .hide('slide', { direction: 'up' }, 500);
    }
  });
           
<!-- Hide/Show Lobby functionality -->
var $lobby = $('#lobby')
  , $lobby_trigger = $('#lobby_trigger');
$(function() {
  $lobby.hide();
  var columns_resized = false;

  $('#lobbyWrapperDiv').hoverIntent(function() {
    console.log('hover trigger fired!');
    if ($lobby_trigger.hasClass('active')) {
      return;
    }
    else {
      $lobby
        .css({
          left: calculateLeft()
        , top: calculateTop()
        })
        .stop(true, true)
        .show('fade', 250);
      if (! columns_resized) {
        $lobby.find('#table_list').dataTable().fnAdjustColumnSizing();
        columns_resized = true;
      }
    }
  }, function() {
    console.log('hover off trigger fired!');
    if ($lobby_trigger.hasClass('active')) {
      return;
    }
    else {
      $lobby.stop(true, true)
            .hide();
    }

  });

  $lobby_trigger.click(function() {
    console.log('lobby trigger fired!');
    if (! $lobby_trigger.hasClass('active')) {

      // add active class
      $lobby_trigger
        .addClass('active');
      // hide lobby form
      $lobby
        .css({
          left: calculateLeft()
        , top: calculateTop()
        })
        .stop(true, true)
        .show('fade', 400);
      if (! columns_resized) {
        $lobby.find('#table_list').dataTable().fnAdjustColumnSizing();
        columns_resized = true;
      }
    }
    else {
      // remove active class
      $lobby_trigger
        .removeClass('active');
      // hide lobby form
      $lobby
        .stop(true, true)
        .hide();
    }
  });

  function calculateLeft() {
    var trigger_left = $lobby_trigger.position().left - $lobby_trigger.width() - 20
      , max_left = $(window).width() - $lobby.width()
      , left = trigger_left < max_left ? trigger_left : max_left;
    return left;
  }

  function calculateTop() {
    return $lobby_trigger.position().top + $lobby_trigger.height();
  }

  if ($('#server_values').data('current_table_names').length === 0) {
    $lobby_trigger.click();
  }

});

<!-- Hide/Show Account functionionality -->
var $account = $('#account')
  , $account_trigger = $('#account_trigger')

$(function() {
  $account_trigger.click(account_drop)
});

function account_drop() {
  //$account.show('slide', { direction: "right" }, 400);
  console.log('account dropdown trigger fired.');

    if (! $account_trigger.hasClass('active')) {
      // add active class
      $account_trigger
        .addClass('active');
      // hide lobby form
      $account
        .css({
          left: $(this).position().left - 160
        , top: $(this).position().top
        })
        .stop(true, true)
        .show('slide', {direction: 'right'},  400);
    }
    else {
      // remove active class
      $account_trigger
        .removeClass('active');
      // hide lobby form
      $account
        .stop(true, true)
        .hide('slide', {direction: 'right'},  400);
    }
}

  // ajax form submission
  $report_bug.find('form').submit(function(e) {
    console.log($(this).attr('id'));
    var empty_form = $(this).html(); //$(this) is $report_bug
    // form has been submitted; $(this) is the form
    e.preventDefault();
    console.log('report_bug form submitted!');
    // add spinner image (replaces submit button?)
    $('#bug_submit').hide();
    $('#loader').show();

    var $message = $(this).find('textarea')
      , message = $message.val();
    $.post('/report_bug', {
      message: message
    }, function(response) {
      console.log('response from server:', response);
      // hide spinner image
      $('#loader').hide();

      // show "received" message
      $('#feedback_message').show();
      
      // hide report_bug form after delay
      var delay = 3
        , $explode_timer = $('#explode_timer')
        , second_seconds = 'seconds';
      $explode_timer.text(delay + ' ' + second_seconds);
      setInterval(function() {
        delay--;
        if (delay === 0) {
          $report_bug.effect('explode', { pieces: 16 }, 500, function() {
            $(this).find('form').html(empty_form);
          });
        }
        else {
          second_seconds = delay > 1 ? 'seconds' : 'second';
          $explode_timer.text(delay + ' ' + second_seconds);
        }
      }, 1000);
    });
  });
});

<!-- Hide/Show Register functionality -->
  $.validator.setDefaults({
    messages: {
      new_password_confirm: {
        equalTo: 'Password fields must match.'
      }
    }
  });
  $(function() {
    $('#register form[action="/register"]').validate();
    $('#login form[action="/login"]').validate();
  });
