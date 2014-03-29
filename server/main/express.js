'use strict';

var express = require('express'),
    path = require('path'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(express);

module.exports = function(app, config) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });
    app.use(express.static(config.client));
    app.set('views', config.views);
  });

  app.configure('production', function(){
    //app.use(express.favicon(config.client + '/favicon.ico'));
    app.use(express.static(config.client));
    app.set('views', config.views);
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    // Persist sessions with mongoStore
    app.use(express.session({
      secret: 'Anthony Cabrera secret code for the page!',
      store: new mongoStore({
        url: config.db.url,
        collection: 'sessions'
      }, function () {
          console.log("db connection open");
      })
    }));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Router (only error handlers should come after this)
    app.use(app.router);
  });

  // Error handler
  app.configure('development', function(){
    app.use(express.errorHandler());
  });
};