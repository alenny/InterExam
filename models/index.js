var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.dbUrl, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.dbUrl, err);
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
require('./restaurant');

// exports models
module.exports.User = mongoose.model('User');
module.exports.QuestionLibrary = mongoose.model('QuestionLibrary');
module.exports.Restaurant = mongoose.model('Restaurant');