var mongoose = require('mongoose');

var dbUrl = 'mongodb://127.0.0.1/interexam';
mongoose.connect(dbUrl, function (err) {
    if (err) {
        console.error('connect to %s error: ', dbUrl, err);
        process.exit(1);
    }
});

require('./user');
require('./questionLibrary');

// exports models
module.exports.User = mongoose.model('User');
module.exports.QuestionLibrary = mongoose.model('QuestionLibrary');
