module.exports = (function () {
  var User = require('./models/user')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
  console.log('passport version is', passport.version);
  //gets called whenever attempted login
  //returns user or an error message
  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.authenticate(username, password, function(err, user) {
        //console.log('authenticate returns', err, user);
        if (err) {
          return done(err);
        }
        else if (! user) {
          return done(null, false, { message: 'Invalid credentials!' });
        }
        else {
          return done(null, user);
        }
      });
    }
  ));

  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.
  passport.serializeUser(function(user, done) {
    //console.log('serializeUser called!', user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    //console.log('deserializeUser called!', id);
    // everything except password (for security reasons)
    User.getByIdWithoutPassword(id, function(err, user) {
      if (err) { return done(err); }
      if (user instanceof User) {
        done(null, user);
      }
      else {
        done(null, false, { message: 'Unknown id!' });
      }
    });
  });

  function isAuthenticated(req) {
    //console.log('isAuthenticated called; passport _userProperty is', req._passport && req._passport.instance._userProperty);
    return req.isAuthenticated();
  }

  function ensureAuthenticated(req, res, next, message) {
    if (isAuthenticated(req)) {
      return next();
    }
    else {
      req.flash('error', message);
      var redirect_url = '/login?next=' + req.url;
      res.redirect(redirect_url);
    }
  }

  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
  return {
    isAuthenticated: isAuthenticated,
    ensureAuthenticated: ensureAuthenticated
  };
})();