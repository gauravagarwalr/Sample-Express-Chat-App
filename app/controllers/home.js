
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  var user = req.user;

  if(user) {
    res.render('home/index', {
      title: 'Node Express Mongoose Boilerplate'
    });
  } else {
    res.redirect('/login');
  }
};
