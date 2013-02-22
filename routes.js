module.exports = (function () {
  var app = require('./app').app
    , User = require('./modules/user')
    , passport = require('passport')
    , auth = require('./modules/auth')
    , Table = require('./modules/tables').Model;

  var base_page = '/lobby';

  //These app.get functions will display their respective ejs page.
  app.get('/account', auth.ensureAuthenticated, function(req, res) {
    res.render('account', {
      title: 'Account', 
      username: req.user.username,      
    });
  });

  app.get('/bitcoin_info', function(req, res) {
    res.render('bitcoin_info', {
      title: 'bitcoin_info', 
    });
  });

    //home and index link to the same page
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

  //bobby's attempt at sending register the new information
  app.post('/register', function (req, res, next) {
    var username = req.body.username
      , password = req.body.password
      , password_confirm = req.body.password2
      , target = req.body.next || '/';

    if (password === password_confirm) {
      new User({
        username: username,
        password: password
      }).save(function(err, result) {
        if (err) {
          req.flash('error', err.message);
          res.redirect('/register?next=' + target);
        }
        else {
          // Registration successful. Redirect.
          console.log('registration successful!');
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
    res.render('lobby', {});
  });

  app.get('/' + Table.TABLE_PREFIX + ':id', auth.ensureAuthenticated, function(req, res, next) {
    var table_id = req.params.id
      , table = Table.getTable(table_id);

    if (table) {
      res.render('table', {
        table_id: table_id
      });
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
    res.redirect('/404.html');
  });
})();