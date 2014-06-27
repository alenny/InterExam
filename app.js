var express = require('express');
var connect = require('connect');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var errorHandle = require('./errorHandle');

// Create app
var app = express();

// Get configurations
var config = require('./config')(app.get('env'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middlewares
app.use(connect.bodyParser());
app.use(connect.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.send('hello all!');
});

// Error handlers must occur at the end of all app.use(...) calls
errorHandle(app);

app.set('port', process.env.PORT || config.webPort);
var server = app.listen(app.get('port'), function () {
    // print all application settings
    console.log('env: %s', app.get('env'));
    console.log('trust proxy: %s', app.get('trust proxy'));
    console.log('jsonp callback name: %s', app.get('jsonp callback name'));
    console.log('json replacer: %s', app.get('json replacer'));
    console.log('case sensitive routing: %s', app.get('case sensitive routing'));
    console.log('strict routing: %s', app.get('strict routing'));
    console.log('view cache: %s', app.get('view cache'));
    console.log('view engine: %s', app.get('view engine'));
    console.log('views: %s', app.get('views'));

    // print listening information
    console.log('Express server listening on port %s ...', server.address().port);
});

