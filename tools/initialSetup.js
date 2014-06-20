var mongoose = require('mongoose');
var async = require('async');
var models = require('../models');

// Initial users
var user = new models.User({
    name: 'dzy',
    password: '1234'
});

// Initial question libraries
var questionLibrary = new models.QuestionLibrary({
    name: 'JavaScript'
});
questionLibrary.questions.push({
    content: 'Which are NOT JavaScript types?',
    answerCandidates: ['datetime', 'integer', 'string', 'boolean', 'function', 'object', 'undefined'],
    correctAnswerIndex: [0, 1]
});
questionLibrary.questions.push({
    content: 'Which are NOT treated as falsy in JavaScript condition statements?',
    answerCandidates: ['\'false\'', 'null', 'undefined', '\'\' (an empty string)', '0', 'NaN'],
    correctAnswerIndex: [0]
});

// Handle DB operation result
var handleDbResult = function (err, info, callback) {
    var ret = true;
    if (err) {
        ret = false;
        console.log('Error in ' + info + ': ' + err);
    } else {
        console.log(info + ' succeeded.');
    }
    if (callback) {
        callback(err);
    }
    return ret;
};

// Create database
var createDb = function(db, callback) {
    db.dropDatabase(function(err) {
        handleDbResult(err, 'dropping database', callback);
    });
};

// Save a model instance
var saveModel = function(inst, callback) {
    inst.save(function(err) {
        handleDbResult(err, 'saving ' + inst.name + ' to ' + inst.collection.name, callback);
    });
};

// Close DB connection
var closeDbConnection = function(conn) {
    conn.close(function () {
        console.log('DB is disconnected.');
    });
};

// Start initializing DB when DB connection is opened
var conn = mongoose.connection;
var db = conn.db;
conn.once('open', function () {
    console.log('DB is connected.');
    createDb(db, function(err) {
        if (handleDbResult(err, 'creating database')) {
            async.parallel([
                function(callback) {
                    saveModel(user, callback);
                },
                function(callback) {
                    saveModel(questionLibrary, callback);
                }
            ], function() {
                closeDbConnection(conn);
            });
        } else {
            closeDbConnection(conn);
        }
    });
});

