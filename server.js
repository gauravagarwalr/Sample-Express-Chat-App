
/**
 * Module dependencies
 */

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');
var cluster = require('express-cluster');

function initializeAppServer() {
  var app = express();
  var port = process.env.PORT || 3000;

  // Connect to mongodb
  var connect = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(config.db, options);
  };
  connect();

  mongoose.connection.on('error', console.error);
  mongoose.connection.on('disconnected', connect);

  // Bootstrap models
  fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
  });

  // Initializing configs
  require('./config/passport')(passport, config);
  require('./config/express')(app, passport);
  require('./config/routes')(app, passport);

  return app.listen(port);
}

cluster(function() {
  return initializeAppServer();
}, {count: 4});
