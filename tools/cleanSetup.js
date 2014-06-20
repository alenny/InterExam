var mongoose = require('mongoose');
var async = require('async');
var models = require('../models/models');

var user = new models.User({
    name: 'dzy',
    password: '1234'
});

var questionLibrary = new models.QuestionLibrary({
    name: 'JavaScript'
});
questionLibrary.questions.push({
    content: 'Which are not JavaScript types?',
    answerCandidates: ['datetime', 'integer', 'string', 'boolean', 'function', 'object', 'undefined'],
    correctAnswerIndex: [0, 1]
});

var db = mongoose.connection;
db.once('open', function () {
    console.log('DB is connected.');
    async.parallel([
        function (callback) {
            user.save(function (err) {
                if (err) {
                    console.log('Cannot save user because: ' + err);
                } else {
                    console.log('user saved.');
                }
                callback(null);
            });
        },
        function (callback) {
            questionLibrary.save(function(err) {
                if (err) {
                    console.log('Cannot save questionLibrary because: ' + err);
                } else {
                    console.log('questionLibrary saved.');
                }
                callback(null);
            });
        }
    ], function () {
        db.close(function () {
            console.log('DB is disconnected.');
        });
    });
});

