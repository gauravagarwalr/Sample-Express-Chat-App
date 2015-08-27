
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../../lib/utils');

/**
 * Load
 */

exports.load = function (req, res, next, id) {
  var options = {
    criteria: { _id : id }
  };
  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
      return res.render('users/signup', {
        errors: utils.errors(err.errors),
        user: user,
        title: 'Sign up'
      });
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) req.flash('info', 'Sorry! We are not able to log you in!');
      return res.redirect('/');
    });
  });
};

/**
 * Show login form
 */

exports.login = function (req, res) {
  var user = req.user;

  if(user) {
    res.redirect("/");
  } else {
    res.render('users/login', {
      title: 'Login'
    });
  }
};

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  var user = req.user;

  if(user) {
    res.redirect("/");
  } else {
    res.render('users/signup', {
      title: 'Sign up',
      user: new User()
    });
  }
};

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/login');
};

/**
 * Session
 */

exports.currentUser = function (req, res) {
  res.format({
    'application/json': function () {
      res.send({user: req.user});
    }
  });
};

exports.session = login;

/**
 * Login
 */

function login (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
};
