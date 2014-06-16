var express = require('express');
var connect = require('connect');
var path = require('path');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen('8888', function() {
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
    console.log('Listening on port %d ...', server.address().port);
});
