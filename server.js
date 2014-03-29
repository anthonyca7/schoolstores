'use strict';

var express  = require("express");
var path     = require('path');
var fs       = require('fs');
var mongoose = require('mongoose');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/' + process.env.NODE_ENV);

var db = mongoose.connect(config.db.url, config.db.options);

//var passport = require(config.mainDir + '/passport');

var modelsPath = path.join(__dirname, 'server/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

require(config.mainDir + '/express')(app, config);

//require(config.serverDir + '/routes')(app);

app.listen(config.port, function () {
  console.log('Express server listening at http://localhost:%d in %s mode', config.port, app.get('env'));
});

app.get('/', function (req, res, next) {
	res.render('index');
});


module.exports = app;