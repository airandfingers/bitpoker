module.exports = (function () {
  var app = require('./app').app
    , passport = require('passport')
    , auth = require('./auth')
    , User = require('./models/user')
    , Room = require('./models/room')
    , Table = require('./models/table');

  var base_page = '/lobby';
  
  //These app.get functions will display their respective ejs page.
  app.get('/account', auth.ensureAuthenticated, function(req, res) {
    res.render('account', {
      title: 'Account',
      username: req.user.username,
      registration_date: req.user.registration_date,
      email: req.user.email,
      maobucks: req.user.maobucks,
    });
  });

  app.get('/bitcoin_info', function(req, res) {
    res.render('bitcoin_info', {
      title: 'bitcoin_info', 
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
  })

  app.get('/login', function (req, res) {
    //console.log("GET /login called!");
    //Show the login form.
    res.render('login', {
      message: req.flash('error'),
      next: req.query.next,
      title: 'Bitcoin Poker Login',
    });
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

  // validate e-mail address & save to MongoDB
  app.post('/account', function (req, res) {
    var email = req.body.email
      , valid = true; //this is a stub to hold the place for a email validator functionality. 
      console.log("POST /account called " + req.body.email +"req.user is ", req.user);
      console.log("req is ", req);
    //if email is valid, save it to MondoDB
    if (valid) {
      //attach e-mail to user
      User.update({ _id: req.user._id }, { $set: { email: email } }, function(err) {
        if (err)
          console.error('error when saving email to database.');
        console.log("email saved to" + req.user.username + "'s account.");
      });
    }
    res.redirect('/account'); 
  });

  // update maobuckx
  app.post('/update_maobucks', function (req, res) {
    var maobucks_update = req.body.maobucks_update;
    console.log("calling maobucks update route");
    User.update({_id: req.user._id}, { $set: { maobucks: maobucks_update } }, function(err) {
      if (err)
        console.error('error when updating maobucks to database.');
      console.log("Updated to"+ req.user.username +"'s account to " + maobucks_update + "maobucks.");
    } );
    res.redirect('/account')
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
    var table_names = Table.getTableNames()
      , users = Room.getRoom('lobby').getUsernames()
      , room_state = { users: users };
    res.render('lobby', {
      table_names: table_names
    , room_state : JSON.stringify(room_state)
    });
  });

  app.get('/' + Table.TABLE_PREFIX + ':id', auth.ensureAuthenticated, function(req, res, next) {
    var table_id = req.params.id
      , table = Table.getTable(table_id)
      , username = req.user.username;
    if (table instanceof Table) {
      var table_state = table.getCurrentRound().serialize(username)
        , users = table.room.getUsernames()
        , room_state = { users: users };
      res.render('table', {
        table_id: table_id
      , hide_navbar: true
      , room_state : JSON.stringify(room_state)
      , table_state: JSON.stringify(table_state)
      });
    }
    else {
      next('No table with ID ' + table_id);
    }
  });

  app.get('/table_state/:id', auth.ensureAuthenticated, function(req, res, next) {
    var table_id = req.params.id
      , table = Table.getTable(table_id)
      , username = req.user.username;

    req.user.maobucks_inquire(function(err, maobucks){console.log(err, maobucks);});

    if (table instanceof Table) {
      var table_state = table.getCurrentRound().serialize(username);
      res.json(table_state);
    }
    else {
      next('No table with ID ' + table_id);
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