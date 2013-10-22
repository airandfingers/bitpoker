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
          left: calculateLeft($lobby_trigger, $lobby)
        , top: calculateTop($lobby_trigger)
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
          left: calculateLeft($lobby_trigger, $lobby)
        , top: calculateTop($lobby_trigger)
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

  

  if ($('#server_values').data('current_table_names').length === 0) {
    $lobby_trigger.click();
  }

});



$(function() {
  var $account_trigger = $('#account_trigger')
    , $account_dropdown = $('#account');
  $account_trigger.click(function() {
    toggleDropdown($account_trigger, $account_dropdown,
                   { top: 0
                   , toggle_args: ['slide', { direction: 'right' }, 400] });
  });
});

function toggleDropdown($trigger, $dropdown, options) {
  console.log('toggleDropdown called with', $trigger, $dropdown);
  //console.log('$dropdown\'s top and left are', $dropdown.position().top, $dropdown.position().left);
  if (true) {
    // calculate and set position of $dropdown
    var left = (! _.isUndefined(options.left)) ? options.left : calculateLeft($trigger, $dropdown)
      , top = (! _.isUndefined(options.top)) ? options.top : calculateTop($trigger)
      , toggle_args = options.toggle_args || ['fade']
    $dropdown.css({
      left: left
    , top: top
    });
  }
  // add or remove active class
  $trigger.toggleClass('active');
  // show or hide dropdown
  $dropdown.stop(true, true)
           .toggle.apply($dropdown, toggle_args);
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

function calculateLeft($trigger, $dropdown) {
  // calculate trigger's left and maximum left
  var trigger_left = $trigger.position().left
    , max_left = $(window).width() - $dropdown.width()
  // return whichever is less
    , left = trigger_left < max_left ? trigger_left : max_left;
  return left;
}

function calculateTop($trigger) {
  // return vertical position of $trigger's bottom
  console.log($trigger.position().top, $trigger.height());
  return $trigger.position().top + $trigger.height();
}

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