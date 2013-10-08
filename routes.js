module.exports = (function () {
  var app = require('./app').app
    , _ = require('underscore') // list utility library
    , passport = require('passport')
    , nodemailer = require('nodemailer')
    , auth = require('./auth')
    , User = require('./models/user')
    , Room = require('./models/room')
    , Table = require('./models/table')
    , HandHistory = require('./models/hand_history')
    , db_config = require('./models/db.config')
    , mailer = require('./mailer')
    , request = require('request');

  var package_file = require('./package.json');
  console.log('package.json version is ' + package_file.version);

  var base_page = '/';
  
  //These app.get functions will display their respective ejs page.
  app.get('/account', auth.ensureAuthenticated, function(req, res) {
    console.log('req.user is ' + req.user);
    var table_games = Table.getTableGames();

    res.render('account', {
      table_games: table_games,
      title: 'Account',
      username: req.user.username,
      registration_date: req.user.registration_date,
      email: req.user.email,
      funbucks: req.user.funbucks,
      email_confirmed: req.user.email_confirmed,
      bitcoins: req.user.satoshi / 1E8,
      satoshi: req.user.satoshi,
      message: req.flash('error'),
    });
  });

  app.get('/bitcoin_info', function(req, res) {
    var table_games = Table.getTableGames();
    res.render('bitcoin_info', {
      table_games: table_games,
      title: 'Bitcoin Information',
    });
  });

  //Blockchain callback route to deposit bitcoins:
  app.get('/bitcoin_deposit/:username', function (req, res) {

    if (req.query.confirmations ==='6') {
      var username = req.params.username
        , bitcoin_update = req.query.value;
      try {
       bitcoin_update = parseInt(bitcoin_update, 10);
      }
      catch(e) {
       console.error('Error while attempting to parse deposit', bitcoin_update, ':', e);
       return;
      }   
      // Do we include code here to verify this amount was really deposited?
      //
      //
        console.log('bitcoin_deposit request came in for username ' + username, ':', req.query);
        console.log('bitcoin_update = ' + bitcoin_update);
      //increase the amount of users bitcoin account.
          User.findOne({username: username}, function (err, user) {
            if (err) {
              console.log('Error when looking up old bitcoin balance.');
            }
            else {
              console.log('Old bitcoin satoshi looked up is ' + user.satoshi + ' satoshi.');
              var old_balance = user.satoshi
                , new_bitcoin_balance = old_balance + bitcoin_update;
              console.log('New bitcoin balance will be ' + new_bitcoin_balance);
              console.log('calling bitcoin deposit update route');
              User.update({username: username}, { $set: { satoshi: new_bitcoin_balance } }, function(err) {
                if (err) {
                  console.error('error when updating bitcoin balance to database.'); 
                }
                else {
                console.log('Deposited ' + bitcoin_update + ' into ' + username + '\'s account.\nNew balance is '+ new_bitcoin_balance + ' satoshi.');
                }
              } );          
            }
          });
    }
  });

  app.get('/deposit_bitcoins', auth.ensureAuthenticated, function(req, res) {
    console.log(req.user.deposit_address);
    res.render('deposit_bitcoins', {
      title: 'Deposit Bitcoins',
      deposit_address: req.user.deposit_address,
      username: req.user.username
    });
  });

  app.get('/payment_made/:username', function(req, res) {
    var username = req.params.username;
    console.log('payment made to', username, req);
  });

  app.get('/withdraw_bitcoins', auth.ensureAuthenticated, function(req, res) {
    res.render('withdraw_bitcoins', {
     title: 'Withdraw Bitcoins',
     bitcoins: req.user.satoshi / 10E8,
    });
  });

  // home, index, lobby, play, and / all show the landing page
  function renderHome(req, res) {
    var users = Room.getRoom('').getUsernames()
      , table_games = Table.getTableGames()
      , room_state = { users: users };

      if (_.isObject(req.user)) { 
        console.log('req.user is an object');
        if ( _.isString(req.query.joined_table_name) ) {
          console.log('req.query.joined_table_name is a string');
          req.user.current_table_names.push(req.query.joined_table_name);
        }
      }
      
    //console.log('Got table_games:', table_games);

    res.render('index', {
      title: 'Bitcoin Poker'
    , table_games: table_games
    , room_state: JSON.stringify(room_state)
    , message: req.flash('error')
    , user: req.user
    });
  }
  app.get('/', renderHome);

  function redirectToHome(req, res) {
    res.redirect('/');
  }
  app.get('/home', redirectToHome);
  app.get('/index', redirectToHome);
  app.get('/lobby', redirectToHome);
  app.get('/play', redirectToHome);

  app.get('/leaderboard', function (req, res) {
    User.getLeaders('funbucks', function (err, funbucks_leaders) {
      if (err) return (err);
      //console.log('Callback called. User.getLeaders is', leaders);
      User.getLeaders('satoshi', function (err, satoshi_leaders) {
        if (err) return (err);
        var table_games = Table.getTableGames();
        res.render('leaderboard', {
          table_games: table_games,
          title: 'Leaderboard',
          funbucks_leaders: funbucks_leaders,
          satoshi_leaders: satoshi_leaders
        });        
      });
    });
  });

  app.get('/legal_info', function (req, res) {
    res.render('legal_info', {
      title: 'Legal Information',
    });
  });

  app.get('/login', function (req, res) {
    var table_games = Table.getTableGames();
    var next_page = req.query.next || base_page;
    if (! auth.isAuthenticated(req)) {
      //Show the login form.
      res.render('login', {
        table_games: table_games,
        message: req.flash('error'),
        next: next_page,
        title: 'Login',
        table_games: table_games
      });
    }
    else {
      //Redirect to 'next' URL.
      res.redirect(next_page);
    }
  });
  
  //this page is where you request the password recovery e-mail
  app.get('/password_recovery', function (req, res) {
    res.render('password_recovery', {
      message: req.flash('error'),
      next: req.query.next,
      title: 'Password Recovery',
    });
  });


  //this page is where you reset your password (after receiving the e-mail)
  app.get('/password_reset', function(req, res) {
    var email = req.query.email
      , recovery_code = req.query.recovery_code
      , username = req.query.username;
      console.log(email + recovery_code + username);
    res.render('password_reset', {
      message: req.flash('error'),
      title: 'Password Reset',
      email: email,
      recovery_code: recovery_code,
      username: username,
    });
    console.log('Password reset page loaded with username ' + username + ', recovery code ' + recovery_code + ', and e-mail ' + email + '.');
  });

  app.get('/promo', function (req, res) {
    res.render('promo', {
      title: 'Promo',
    });
  });

  //home, index and '/' link to the same page
  function renderRegister(req, res) {
    var next_page = req.query.next || base_page;
    if (! auth.isAuthenticated(req)) {
      //Show the registration form.
      res.render('register', {
        message: req.flash('error'),
        next: req.query.next,
        title: 'Ready to play?',
        mode: 'register'
      });
    }
    else {
      if (User.isGuest(req.user.username)) {
        //Show the 'conversion' form.
        res.render('register', {
          message: req.flash('error'),
          next: req.query.next,
          title: 'Ready to play?',
          mode: 'convert'
        });
      }
      else {
        //Redirect to 'next' URL.
        res.redirect(next_page);
      }
    }
  }
  app.get('/register', renderRegister);
  app.get('/guest_convert', renderRegister);

  app.get('/site_info', function(req, res) {
    res.render('site_info', {
      title: 'Site Information',
    });
  });

  //this route handles e-mail verification links.
  app.get('/verify_email', function (req, res) {
    var email = req.query.email
      , confirmation_code = req.query.confirmation_code;

    //check user database for users with matching email and confirmation code, then update email_confirmed property to true.
    User.findOneAndUpdate( {email: email, confirmation_code: confirmation_code},
                           {email_confirmed: true}, function(err, user) {
      console.log('findOneAndUpdate returns', err, user);
      if (err) {
        console.error('Error during findOneAndUpdate:', err);
      }
      else if (_.isEmpty(user)) {
        req.flash('error', 'Sorry, there was something wrong with your email confirmation link.');
      }
      else {
        req.flash('error', 'Your email address has been successfully confirmed.');
      }
      res.redirect('/account');
    });
  });

  // validate e-mail address & save to MongoDB & send an e-mail confirmation.
  app.post('/set_email', function (req, res) {
    var username = req.user.username
      , email = req.body.email;

    // don't let guest users set an email address (they can't log in anyway)
    if (User.isGuest(username)) {
      req.flash('error', 'You cannot register an email address to a guest account.');
      res.redirect('/account');
      return;
    }
    console.log('POST /set_email called ' + req.body.email +'req.user is ', req.user);
    //if email is valid, save it to MondoDB
    req.user.sendConfirmationEmail(email, function(err) {
      if (err) {
        res.json({ error : err });
      }
      else {
        res.redirect('/account');
      }
    });
  });

  //delete account
  app.post('/delete_account', function (req, res) {
    console.log('delete_account route fired.');
    User.remove({ _id: req.user.id }, function(err) {
        if (_.isEmpty(err)) {
          console.log('Account deleted!');
          req.flash('error', 'Account deleted. Play again soon!');
          res.redirect(base_page);
        }
        else {
          console.error('Error when attempting to delete account:', err);
          req.flash('error', 'Error when attempting to delete account:' + err);
          res.redirect(base_page)
        }
    });
  });

  //Guest Login Route
  function createGuestUser(req, res) {
    console.log('guest_login route fired!');

    var target = req.body.next || req.query.next || base_page;
    User.createGuestUser(function(user) {
      user.save(function(save_err, result) {
        if (save_err) {
          req.flash('save_err is', save_err.message);
          res.redirect('/login?next=' + target);
        }
        else {
          // Guest_Registration successful. Redirect.
          console.log('Guest registration successful!');
          //req.flash('error', 'Welcome ' + username);
          req.login(user, function(login_err) {
            console.log('login_err is', login_err, ', req.user is', req.user);
            if (login_err) {
              req.flash('error', login_err.message);
              return res.redirect('/login?next=' + target);
            }
           res.redirect(target);
          });
        }
      });
    });
  }
  app.post('/guest_login', createGuestUser);
  app.get('/guest_login', createGuestUser);
  
  //submit password recovery to user's e-mail address route.
  app.post('/password_recovery', function (req, res) {
    var username = req.body.username;
    console.log('Post /password recovery route called for username: ' + username);
    User.findOne({ username: username }, function(err, user) {
      console.log('findOne returns', user);
      if (err) {
        console.error('Error during findOne:', err);
        res.json({ error: 'Error during findOne:' + JSON.stringify(err) });
      }
      else if (user === null) {
        req.flash('error', 'Sorry. There is no such user as ' + username + '. Hope you did not forget your username. That could be bad.');
        res.redirect('/password_recovery');
      }
      else if (_.isEmpty(user.email)) {
        req.flash('error', 'Sorry. There is no e-mail registered with the account for ' + username + '. You cannot recover your password.');
        res.redirect('/password_recovery');
      }
      else {
        User.generatePasswordRecoveryCode(function (err, recovery_code) {
          if (err) {
            console.error('Error while generating confirmation code:', err);
            res.json({ error: 'Error while generating confirmation code:' + JSON.stringify(err) });
          }
          else {
            user.recovery_code = recovery_code;
            console.log('before save:', user);
            user.save(function(err) {
              console.log('after save:', user);
              if (err) {
                console.error('Error during save:', err);
                res.json({ error: 'Error during save:' + JSON.stringify(err) });
              }
              else {
                req.flash('error', 'A recovery e-mail has been sent to your registered account. Check your e-mail for further instructions.');
                res.redirect('/login');
              }
            });
            mailer.sendPasswordRecovery(user.email, recovery_code, username);
          }
        });
      }
    });
  });

  //resets password to whatever the user inputs.
  app.post ('/password_reset', function (req, res) {
    var email = req.body.email
      , recovery_code = req.body.recovery_code
      , username = req.body.username
      , password = req.body.password
      , password_confirm = req.body.password_confirm;
    console.log('calling password reset route. password is', password, 'password_confirm is', password_confirm);
        if (password === password_confirm) {
          User.findOne( {username: username, recovery_code: recovery_code}, function(err, user) {
            if (err) {
              console.error('Error during findOne: ' + err.message);
              req.flash('Error during findOne: ' + err.message);
              res.redirect('back');
            }
            else if (! user) {
              req.flash('error', 'No user found with that username and recovery_code!');
              res.redirect('back');
            }
            else {
                user.password = User.encryptPassword(password);
                user.recovery_code = null;
                user.save(function(err, result) {
                  if (err) {
                    req.flash('error', err.message);
                    res.redirect('back');
                  }                  
                  else {
                    // password reset successful. Redirect.
                    console.log('password reset successful' + ' !');
                    req.flash('error', 'Password reset is successful. Cheers, mate.');
                    res.redirect('/login');
                  }
                });
            }
          }); 
        }
        else { 
          console.error('Passwords do not match son.  ' + password + '!= ' + password_confirm);
          res.redirect('back');
        }
  });

  //bug_report/feedback form route
  app.post('/report_bug', function (req, res) {
    var username = req.user && req.user.username || undefined
    , message = req.body.message;
    console.log('report bug route called');
    mailer.sendBugReport(username, message, function(error) {
      if (error) {
        console.error('Error while trying to send bug reportemail!', error);
      }
    });
    res.json({ success: true });
  });


  //remove email from account association
  app.post('/remove_email', function (req, res) {
    console.log('calling remove email route');
    User.update({_id: req.user._id}, { $unset: { email: undefined }, $set: { email_confirmed: false } }, function(err) {
      if (err) {
        console.error('error when removing email from database.'); 
      }
      else {
      console.log('Removed email from ' + req.user.username +'\'s account.');
      }
    });
    res.redirect('back');
  });

  // update funbucks
  app.post('/increase_funbucks_by_100', function (req, res) {
    var funbucks_to_add = 100;
    console.log('calling funbucks update route');
    User.update({_id: req.user._id}, { $inc: { funbucks: funbucks_to_add } }, function(err) {
      if (err) {
        console.error('Error when changing user\'s funbucks balance:', err); 
      }
      else {
        console.log('Added ' + funbucks_to_add + ' to '+ req.user.username + '\'s account.');
      }
    });
    res.redirect('back');
  });

  app.post('/login',
           passport.authenticate('local', 
                                 { failureRedirect: '/login', 
                                   failureFlash: true }),
           function (req, res) {
    // Authentication successful. Redirect.
    //console.log('POST /login called!');
    res.redirect(req.body.next || base_page);
  });

  //withdraw bitcoins
  app.post('/withdraw_bitcoins', function (req, res) {
    var num_satoshi = req.body.amount * 10E8
      , withdraw_address = req.body.withdraw_address
     // withdraw bitcoins from user's account, send to given public address
      , url = 'https://blockchain.info/merchant/' + db_config.WALLET_ID + '/payment' +
              '?password=' + db_config.WALLET_PASSWORD +
              '&to=' + withdraw_address +
              '&amount=' + num_satoshi;
    console.log('num_satoshi:', num_satoshi, 'withdraw_address:', withdraw_address, 'url:', url);
    if (num_satoshi > 0) {
      req.user.checkBalance('satoshi', function(err, balance_in_satoshi) {
        if (err) {
          console.error('Error while looking up bitcoin balance:', err);
          res.redirect('back');
          return;
        }
        if (num_satoshi <= balance_in_satoshi) {
          request({
            url: url
          }, function(err, response, body) {
            if (err) {
              console.error('Error while withdrawing:', err);
            }
            else if (response.statusCode !== 200 && response.statusCode !== 201) {
              console.error('Unsuccessful response code while withdrawing:', response.statusCode);
            }
            else {
              var body = JSON.parse(response.body)
                , new_satoshi = req.user.satoshi - num_satoshi;
              console.log('Withdraw successful!', num_satoshi, new_satoshi);
              req.user.update({ $set: { satoshi: new_satoshi } }, function(save_err) {
                if (save_err) {
                  console.error('Error while updating bitcoin balance:', save_err);
                }
              });
            }
            res.redirect('/account');
          });
        }
        else {
          console.error('Tried to withdraw', num_satoshi, 'when balance is only', balance_in_satoshi);
          res.redirect('back');
        }
      });
    }
    else {
      console.error('Tried to withdraw', num_satoshi);
      res.redirect('back');
    }
  });

  //Send register the new information
  app.post('/register', function (req, res, next) {
    var username = req.body.username
      , pt_password = req.body.new_password
      , password_confirm = req.body.new_password_confirm
      , email = req.body.email || undefined
      , target = req.body.next || base_page;

    if (_.isEmpty(username) || _.isEmpty(pt_password)) {
      req.flash('error', 'Cannot register without both username and password!');
      res.redirect('/register?next=' + target);
      return;
    }

    if (pt_password !== password_confirm) {
      //console.log('password fields did not match!');
      req.flash('error', 'Password fields did not match!');
      res.redirect('/register?next=' + target);
      return;
    }

    if (auth.isAuthenticated(req)) {
      if (User.isGuest(req.user.username)) {
        console.log('augmenting', req.user.username, 'with spec:',
                    { username: username, pt_password: pt_password });
        req.user.convertFromGuest({
          username: username, pt_password: pt_password, email: email
        }, function(err, user) {
          if (err) {
            req.flash('error', err.message);
            res.redirect('/register?next=' + target);
          }
          else {
            req.login(user, function(err) {
              //console.log('error is', err, '\n req.user is', req.user);
              if (err) {
                req.flash('error', err.message);
                return res.redirect('/login?next=' + target);
              }
             res.redirect(target);
            });
          }
        });
      }
    }
    else {
      console.log('creating user with spec:',
                  { username: username, pt_password: pt_password });
      User.createUser({ username: username, pt_password: pt_password, email: email }, function(create_err, user) {
        console.log('createUser returns', create_err, user);
        if (create_err) {
          req.flash('error', create_err);
          res.redirect('/register?next=' + target);
        }
        else {
          // Registration successful. Log in.
          req.login(user, function(login_err) {
            console.log('error is', login_err, '\n req.user is', req.user);
            if (login_err) {
              req.flash('error', login_err.message);
              return res.redirect('/login?next=' + target);
            }
           res.redirect(target);
          });
        }
      });
    }
  });

  app.get('/logout', function (req, res) {
    //console.log('GET /logout called!');
    //End this user's session.
    req.logout();
    res.redirect(base_page);
  });

  // helper middlewarefor table_:id routes
  function redirectIfUnauthenticated(req, res, next) {
    if (auth.isAuthenticated(req)) {
      next();
    }
    else if (req.query.play_as_guest) {
      res.redirect('/guest_login?next=' + req.originalUrl);
    }
    else {
      auth.ensureAuthenticated(req, res, next, 'You must log in before you can play!');
    }
  }
  app.get('/' + Table.TABLE_PREFIX + ':id',
          redirectIfUnauthenticated,
          function(req, res, next) {
    var table_id = req.params.id
      , table = Table.getTable(table_id)
      , table_name = table.name
      , username = req.user.username;
    if (table instanceof Table) {
      var table_state = table.getCurrentHand().serialize(username)
        , users = table.room.getUsernames()
        , room_state = { users: users };
      req.user.onJoinTable(table_name);
      res.render('table', {
        table_id: table_id
      , table_name: table_name
      , username: username
      , game: table.game
      , hide_navbar: true
      , room_state : JSON.stringify(room_state)
      , table_state: JSON.stringify(table_state)
      , dont_include_styles: true
      });
    }
    else {
      next('No table with ID ' + table_id);
    }
  });

  app.get('/table_state/:table_id', auth.ensureAuthenticated, function(req, res) {
    var table = Table.getTable(req.params.table_id)
      , hand_include = req.query.fields || 'all';

    if (! (table instanceof Table)) {
      res.json({ error: 'No table with ID ' + table_id });
      return;
    }

    table.getTableState(req.user, hand_include, function(err, table_state) {
      if (err) {
        res.json({ error: err });
      }
      else {
        res.json(table_state);
      }
    });
  });

  app.get('/preferences/:table_id', auth.ensureAuthenticated, function(req, res) {
    var table = Table.getTable(req.params.table_id)
      , player;
    if (! (table instanceof Table)) {
      res.json({ error: 'No table with ID ' + table_id });
      return;
    }

    username = req.user.username;
    player = table.getPlayer(username);
    if (player) {
      res.json(player.preferences);
    }
    else {
      res.json({ error: 'Cant get preferences when not at table!' });
    }
  });

  app.get('/flags/:table_id', auth.ensureAuthenticated, function(req, res) {
    var table = Table.getTable(req.params.table_id)
      , player;
    if (! (table instanceof Table)) {
      res.json({ error: 'No table with ID ' + table_id });
      return;
    }

    username = req.user.username;
    player = table.getPlayer(username);
    if (player) {
      res.json(player.flags);
    }
    else {
      res.json({ error: 'Cant get preferences when not at table!' });
    }
  });

  app.get('/hand_histories', auth.ensureAuthenticated, function(req, res) {
    HandHistory.find()
      .sort('-finished_at')
      .exec(function(err, hand_histories) {
      if (err) {
        res.json({ error: 'Error while looking up hand histories:' + err });
      }
      else {
        res.json(hand_histories);
      }
    })
  });

  app.get('/history', auth.ensureAuthenticated, function(req, res) {
    HandHistory.find({ initial_usernames : req.username})
      .sort('-finished_at')
      .exec(function(err, hand_histories) {
      if (err) {
        res.json({ error: 'Error while looking up hand histories:' + err });
      }
      else {
        res.json(hand_histories);
      }
    });
  });

  app.post('/leave_table', auth.ensureAuthenticated, function(req, res) {
    var table_name = req.body.table_name;
    console.log('/leave_table called on', req.user.username, 'for', table_name);
    if (! _.isString(table_name)) {
      return res.json({ error: 'table_name is a required field for /leave_table'});
    }
    req.user.onLeaveTable(table_name);
    res.json(table_name);
  });

  app.get('/check_username', function(req, res) {
    var username = req.query.username;
    if (User.isGuest(username)) {
      return res.json('Your username may not begin with "guest".');
    }
    User.findOne({ username: username }, function(find_err, user) {
      if (find_err) {
        console.error('Error while trying to look up user named', username, find_err);
        return res.json('Sorry, something went wrong. We\'ll look into it.');
      }
      if (user) {
        return res.json('The name ' + username + ' is already taken.')
      }
      res.json(true);
    });
  });

  //Handle all other cases with a 404
  //Note: ONLY do this if app.use(app.router) comes after
  //      app.use(express.static) in this app's configuration;
  //      otherwise, this route will catch all incoming requests,
  //      including requests for static files that exist.
  app.all('*', function(req, res) {
    res.status(404);
    res.render('404', {title: '404 Not Found'});
  });
})();