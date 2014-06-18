var express = require('express');
var connect = require('connect');
var path = require('path');

// load local modules
var errorHandle = require('./error-handle');
var routes = require('./routes.js');

// Create app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middlewares
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// set routes to app
routes(app);

// Must occurs at the end of all app.use(...) calls
errorHandle(app);

module.exports = app;

