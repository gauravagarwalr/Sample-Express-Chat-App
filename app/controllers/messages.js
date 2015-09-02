var moment = require('moment');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var Message = mongoose.model('Message');

exports.index = function(req, res) {
  var currentUser = req.user;

  User.load({criteria: { _id: req.params.userId }}, function(err, user) {
    if (err) return res.render('500');

    var since;
    if(req.query.since) {
      since = moment(req.query.since);
    } else {
      since = moment().subtract(7, "days");
    }

    var messagesCriteria = {
      $or: [
        {
          $and: [
            {from: currentUser._id},
            {to: user._id}
          ]
        },
        {
          $and: [
            {to: currentUser._id},
            {from: user._id}
          ]
        }
      ],
      createdAt: {
        $gte: since.toDate()
      }
    };

    Message.list(messagesCriteria, function(err, messages) {
      if(err) return res.render('500');

      res.format({
        "application/json": function () {
          res.send({messages: messages});
        }
      });
    });
  });
};

exports.create = function(req, res) {
  var currentUser = req.user;
  var message = new Message({
    body: req.body.body,
    to: req.params.userId,
    from: currentUser._id
  });

  message.save(function (err) {
    if (err) {
      res.status(500).json({error: 'Unable to send message. Please try again.'});
    }
    res.json(null);
  });
};
