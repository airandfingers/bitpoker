module.exports = (function () {
  var app = require('./app').app
    , _ = require('underscore') // list utility library
    , passport = require('passport')
    , nodemailer = require('nodemailer')
    , auth = require('./auth')
    , User = require('./models/user')
    , Room = require('./models/room')
    , Table = require('./models/table')
    , mailer = require('./mailer');

  var base_page = '/lobby';
  
  //These app.get functions will display their respective ejs page.
  app.get('/account', auth.ensureAuthenticated, function(req, res) {
    console.log("req.user is " + req.user);
    res.render('account', {
      title: 'Account',
      username: req.user.username,
      registration_date: req.user.registration_date,
      email: req.user.email,
      maobucks: req.user.maobucks,
      email_confirmed: req.user.email_confirmed,
      bitcoins: req.user.bitcoins,
    });
  });

  app.get('/bitcoin_info', function(req, res) {
    res.render('bitcoin_info', {
      title: 'bitcoin_info', 
    });
  });

  app.get('/deposit_bitcoins', function(req, res) {
    res.render('deposit_bitcoins', {
      title: 'deposit_bitcoins', 
    });
  });

  app.get('/withdraw_bitcoins', function(req, res) {
    res.render('withdraw_bitcoins', {
     title: 'withdraw_bitcoins', 
    });
  });

    //home, index and "/" link to the same page
   app.get('/', function(req, res) {
    res.render('index', {
      title: 'Homepage', 
    });
  });

  app.get('/home', function(req, res) {
    res.render('index', {
      title: 'Homepage', 
    });
  });

    //home and index link to the same page
  app.get('/index', function(req, res) {
    res.render('index', {
      title: 'Homepage', 
    });
  });

  app.get('/legal_info', function (req, res) {
    res.render('legal_info', {
      title: 'legal_info',
    });
  });

  app.get('/login', function (req, res) {
    var next_page = req.query.next || base_page;
    if (! auth.isAuthenticated(req)) {
      //Show the login form.
      res.render('login', {
        message: req.flash('error'),
        next: next_page,
        title: 'Bitcoin Poker Login',
      });
    }
    else {
      //Redirect to "next" URL.
      res.redirect(next_page);
    }
  });
  
  //this page is where you request the password recovery e-mail
  app.get('/password_recovery', function (req, res) {
    res.render('password_recovery', {
      message: req.flash('error'),
      next: req.query.next,
      title: 'Bitcoin Poker Password Recovery',
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
      title: 'Bitcoin Poker Password Reset',
      email: email,
      recovery_code: recovery_code,
      username: username,
    });
    console.log("Password reset page loaded with username " + username + ", recovery code " + recovery_code + ", and e-mail " + email + ".");
  });

  app.get('/promo', function (req, res) {
    res.render('promo', {
      title: 'promo',
    });
  });

  app.get('/register', function(req, res) {
    res.render('register', {
      message: req.flash('error'),
      next: req.query.next,
      title: 'Ready to play?', 
    });
  });

  app.get('/site_info', function(req, res) {
    res.render('site_info', {
      title: 'site_info', 
    });
  });

  //this route handles the verify e-mail circumstance.
  app.get('/verify_email', function (req, res) {
    var email = req.query.email
      , confirmation_code = req.query.confirmation_code;

    res.render('verify_email', {    
      username: req.user.username,
      registration_date: req.user.registration_date,
      email: req.user.email,
      maobucks: req.user.maobucks,
      email_confirmed: req.user.email_confirmed,
    });
    console.log("HEY! We got to the verify e-mail route. good job son. req.query.email is ", req.query.email, " and req.query.confirmation code is ", req.query.confirmation_code);
    //check user database for users with matching email and confirmation code, then update email_confirmed property to true.
    User.findOneAndUpdate( {email: email, confirmation_code: confirmation_code}, {email_confirmed: true}, function(err) {
      if (err) {
        console.error('Error during findOneAndUpdate:', err);
      }
    });
  });

  // validate e-mail address & save to MongoDB & send an e-mail confirmation.
  app.post('/account', function (req, res) {
    var email = req.body.email
      , valid = true; //this is a stub to hold the place for a email validator functionality. 
      console.log("POST /account called " + req.body.email +"req.user is ", req.user);
      console.log("req is ", req);
    //if email is valid, save it to MondoDB
    if (valid) {
      //attach e-mail to user
      User.generateConfirmationCode(function(err, confirmation_code) {
        if (err) {
          console.error('Error while generating confirmation code:', err);
        }
        else {
          User.update({ _id: req.user._id },
                      { $set: { email: email, confirmation_code: confirmation_code } },
                      function(err, num_updated) {
            if (err) {
              console.error('Error when saving email to database:', err);
            }
            else if (num_updated <= 0) {
              console.error('Failed to update any users with', req.user._id);
            }
            else {
              console.log("Email saved to" + req.user.username + "'s account.");
              mailer.sendConfirmationEmail(email, confirmation_code, req.user.username);
            }
          });
        }
      });
    }
    res.redirect('/account'); 
  });

  //submit password recovery to user's e-mail address route.
  app.post('/password_recovery', function (req, res) {
    var username = req.body.username;
    console.log("Post /password recovery route called for username: " + username);
    User.findOne({ username: username }, function(err, user) {
      console.log('findOne returns', user);
      if (err) {
        console.error('Error during findOne:', err);
        res.json({ error: 'Error during findOne:' + JSON.stringify(err) });
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
    console.log("req is" + req);
    var email = req.body.email
      , recovery_code = req.body.recovery_code
      , username = req.body.username
      , password = req.body.password
      , password_confirm = req.body.password_confirm;
    console.log("calling password reset route. password is", password, "password_confirm is", password_confirm);
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
                user.password = password;
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
  //remove email from account association
  app.post('/remove_email', function (req, res) {
    console.log("calling remove email route");
    User.update({_id: req.user._id}, { $set: { email: "", email_confirmed: false } }, function(err) {
      if (err) {
        console.error('error when removing email from database.'); 
      }
      else {
      console.log("Removed email from " + req.user.username +"'s account.");
      }
    } );    
    res.redirect('back');
  });

  // update maobucks
  app.post('/update_maobucks', function (req, res) {
    var maobucks_update = req.body.maobucks_update;
    console.log("calling maobucks update route");
    User.update({_id: req.user._id}, { $set: { maobucks: maobucks_update } }, function(err) {
      if (err) {
        console.error('error when updating maobucks to database.'); 
      }
      else {
      console.log("Updated " + req.user.username + "'s account to " + maobucks_update + "maobucks.");
      }
    } );
    res.redirect('back');
  });

  app.post('/login',
           passport.authenticate('local', 
                                 { failureRedirect: '/login', 
                                   failureFlash: true }),
           function (req, res) {
    // Authentication successful. Redirect.
    //console.log("POST /login called!");
    var target = req.body.next;
    if (target) {
      res.redirect(target);
    }
    else {
      res.redirect(base_page);
    }
  });

  //Send register the new information
  app.post('/register', function (req, res, next) {
    var username = req.body.username
      , password = req.body.password
      , password_confirm = req.body.password2
      , target = req.body.next || '/';

    if (password === password_confirm) {
      var user = new User({
        username: username,
        password: password,
      });
      user.save(function(err, result) {
        if (err) {
          req.flash('error', err.message);
          res.redirect('/register?next=' + target);
        }
        else {
          // Registration successful. Redirect.
          console.log('registration successful on' + user.registration_date + ' !');
          req.flash('error', 'Please log in with your new username and password.');
          res.redirect('/login');
          /*req.url = req.originalUrl = '/login';
          app.router._dispatch(req, res, next);*/
        }
      });
    }
    else {
      console.log('password fields did not match!');
      req.flash('error', 'password fields did not match!');
      res.redirect('/register?next=' + target);
    }
  });

  app.get('/logout', function (req, res) {
    //console.log("GET /logout called!");
    //End this user's session.
    req.logout();
    res.redirect(base_page);
  });

  app.get('/lobby', function(req, res) {
    var users = Room.getRoom('lobby').getUsernames()
      , room_state = { users: users }
      , table_games = Table.getTableGames();
    console.log('Got table_games:', table_games);
    console.log('Table games.length is ', table_games.length);
    res.render('lobby', {
      room_state: JSON.stringify(room_state)
    , table_games: table_games
    });
  });

  app.get('/' + Table.TABLE_PREFIX + ':id', auth.ensureAuthenticated, function(req, res, next) {
    var table_id = req.params.id
      , table = Table.getTable(table_id)
      , username = req.user.username;
    if (table instanceof Table) {
      var table_state = table.getCurrentHand().serialize(username)
        , users = table.room.getUsernames()
        , room_state = { users: users };
      res.render('table', {
        table_id: table_id
      , hide_navbar: true
      , room_state : JSON.stringify(room_state)
      , table_state: JSON.stringify(table_state)
      , maobucks: req.user.maobucks

      });
    }
    else {
      next('No table with ID ' + table_id);
    }
  });

  app.get('/table_state/:id', auth.ensureAuthenticated, function(req, res) {
    var table_id = req.params.id
      , table = Table.getTable(table_id)
      , hand_include = req.query.fields || 'all';

    if (table instanceof Table) {
      table.getTableState(req.user, hand_include, function(err, table_state) {
        if (err) {
          res.json({ error: err });
        }
        else {
          res.json(table_state);
        }
      });
    }
    else {
      res.json({ error: 'No table with ID ' + table_id });
    }
  });

  //Handle all other cases with a 404
  //Note: ONLY do this if app.use(app.router) comes after
  //      app.use(express.static) in this app's configuration;
  //      otherwise, this route will catch all incoming requests,
  //      including requests for static files that exist.
  app.all('*', function(req, res) {
    res.render('404', {title: 'pagey not foundy'});
  });
})();