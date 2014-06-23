var models = require('../models');
var QuestionLibrary = models.QuestionLibrary;

var answerNamePattern = /^(\d+)_(\d+)$/;

module.exports.index = function (req, res, next) {
    var examName = req.params.name;
    QuestionLibrary.findOne({ name: examName }, function(err, lib) {
        if (err) {
            next(err);
        } else {
            res.render('exam', { title: lib.displayName + ' Exam', lib: lib });
        }
    });
};

var parseUserAnswers = function(req) {
    var userAnswers = {};
    for (var key in req.body) {
        var matches = answerNamePattern.exec(key);
        if (!matches || req.body[key] !== 'on') {
            continue;
        }
        var questionIndex = Number(matches[1]);
        var answerIndex = Number(matches[2]);
        userAnswers[questionIndex] = userAnswers[questionIndex] || [];
        userAnswers[questionIndex].push(answerIndex);
    }
    return userAnswers;
};

var compareArray = function (arr1, arr2) {
    if (!arr1 && !arr2) {
        return true;
    }
    if (!arr1 || !arr2) {
        return false;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

module.exports.submit = function (req, res, next) {
    var examName = req.params.name;
    var userName = req.body.user;
    var userAnswers = parseUserAnswers(req);
    QuestionLibrary.findOne({ name: examName }, function (err, lib) {
        if (err) {
            next(err);
            return;
        } 
        var correctAnswers = 0;
        for (var i = 0; i < lib.questions.length; ++i) {
            if (compareArray(lib.questions[i].correctAnswerIndex, userAnswers[i])) {
                ++correctAnswers;
            }
        }
        var score = correctAnswers / lib.questions.length * 100;
        res.render('examReport', { title: lib.displayName + ' Exam Report', user: userName, score: score });
    });
};