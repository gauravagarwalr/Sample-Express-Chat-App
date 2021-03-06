/**
 * Module dependencies.
 */

var home = require('home');
var users = require('users');
var messages = require('messages');

/**
 * Expose
 */

module.exports = function (app, passport) {
  // user routes
  app.get('/login', users.login);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.get('/users', users.index);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);

  app.get('/current_user', users.currentUser);

  // Messages

  app.get('/user/:userId/messages', messages.index);
  app.post('/user/:userId/messages', messages.create);

  app.param('userId', users.load);

  // Landing Page

  app.get('/', home.index);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
