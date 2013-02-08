module.exports = function (app) {
  var User = require('./modules/user'),
      passport = require('passport'),
      auth = require('./modules/auth');

  app.get('/login', function (req, res) {
    //console.log("GET /login called!");
    //Show the login form.
    res.render('login', {
      message: req.flash('error'),
      next: req.query.next,
      title: 'Bitcoin Poker Login'
    });
  });

  app.get('/register', function(req, res) {
    res.render('register', {
      message: req.flash('error'),
      next: req.query.next,
      title: 'Ready to play?', 
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
      res.redirect('/');
    }
  });

  //bobby's attempt at sending register the new information
  app.post('/register', function (req, res, next) {
    var username = req.body.username,
        password = req.body.password,
        password_confirm = req.body.password2,
        target = req.body.next || '/';

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
    res.redirect('/');
  });

  app.get('/', function(req, res) {
    res.render('lobby', {});
  });

  app.get('/game/:id', auth.ensureAuthenticated, function(req, res) {
    var game_id = req.params.id;
    res.render('game', {
      game_id: game_id
    });
  });

  //Handle all other cases with a 404
  //Note: ONLY do this if app.use(app.router) comes after
  //      app.use(express.static) in this app's configuration;
  //      otherwise, this route will catch all incoming requests,
  //      including requests for static files that exist.
  app.all('*', function(req, res) {
    res.redirect('/404.html');
  });
};