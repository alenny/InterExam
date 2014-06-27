var mongoose = require('mongoose');
var async = require('async');
var models = require('../models');

// Initial users
var user = new models.User({
    name: 'dzy',
    password: '1234'
});

// Initial question library - JavaScript
var jsQuestionLibrary = new models.QuestionLibrary({
    name: 'javascript',
    displayName: 'JavaScript'
});
jsQuestionLibrary.questions.push({
    content: 'Which are NOT JavaScript types?',
    answerCandidates: ['datetime', 'integer', 'string', 'boolean', 'function', 'object', 'undefined'],
    correctAnswerIndex: [0, 1]
});
jsQuestionLibrary.questions.push({
    content: 'Which are NOT treated as FALSY in JavaScript?',
    answerCandidates: ['\'false\'', 'null', 'undefined', '\'\' (an empty string)', '0', 'NaN', '[]'],
    correctAnswerIndex: [0]
});

// Initial question library - C#
var csQuestionLibrary = new models.QuestionLibrary({
    name: 'csharp',
    displayName: 'C#'
});
csQuestionLibrary.questions.push({
    content: 'Whose code can invoke an internal method of a public class A defined in ASM.dll?',
    answerCandidates: ['Class B derived from A in ASM.dll', 'Class C in ASM.dll', 'Class D derived from A in REFD.dll', 'Class E in REFD.dll'],
    correctAnswerIndex: [0, 1]
});
csQuestionLibrary.questions.push({
    content: 'Where is new int[16000] allocated in the managed heap?',
    answerCandidates: ['Generation 0', 'Generation 1', 'Generation 2', 'Large objects special area'],
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

// Clean database
var cleanDb = function (db, callback) {
    async.parallel([
        function(cb) {
            models.User.remove(cb);
        },
        function(cb) {
            models.QuestionLibrary.remove(cb);
        }
    ], callback);
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
    cleanDb(db, function (err) {
        if (handleDbResult(err, 'cleaning database')) {
            async.parallel([
                function(callback) {
                    saveModel(user, callback);
                },
                function(callback) {
                    saveModel(jsQuestionLibrary, callback);
                },
                function (callback) {
                    saveModel(csQuestionLibrary, callback);
                }
            ], function() {
                closeDbConnection(conn);
            });
        } else {
            closeDbConnection(conn);
        }
    });
});

