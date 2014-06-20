var mongoose = require('mongoose');
var config = require('../config');

var dbUrl = 'mongodb://' + config.dbServer + '/' + config.dbName;
mongoose.connect(dbUrl, function (err) {
    if (err) {
        console.error('connect to %s error: ', dbUrl, err);
        process.exit(1);
    }
});

// Close DB connection when process exit
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});

require('./user');
require('./questionLibrary');

// exports models
module.exports.User = mongoose.model('User');
module.exports.QuestionLibrary = mongoose.model('QuestionLibrary');
