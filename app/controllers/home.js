
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  var user = req.user;

  if(user) {
    res.render('home/index', {
      user: user
    });
  } else {
    res.redirect('/login');
  }
};
