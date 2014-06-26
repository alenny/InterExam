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
    var userAllAnswers = {};
    for (var key in req.body) {
        var matches = answerNamePattern.exec(key);
        if (!matches || req.body[key] !== 'on') {
            continue;
        }
        var questionIndex = Number(matches[1]);
        var answerIndex = Number(matches[2]);
        userAllAnswers[questionIndex] = userAllAnswers[questionIndex] || [];
        userAllAnswers[questionIndex].push(answerIndex);
    }
    return userAllAnswers;
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

var inArray = function(n, arr) {
    if (!arr) {
        return false;
    }
    for (var i = 0; i < arr.length; ++i) {
        if (n === arr[i]) {
            return true;
        }
    }
    return false;
};

// Available answer result: wrong, userCorrect, userWrong, correct
var markAnswers = function (question, userAnswers) {
    for (var i = 0; i < question.answerCandidates.length; ++i) {
        var isCorrect = inArray(i, question.correctAnswerIndex);
        var isUserSelected = inArray(i, userAnswers);
        question.answerCandidates[i] = {
            content: question.answerCandidates[i],
        };
        if (isCorrect && isUserSelected) {
            question.answerCandidates[i].result = 'userCorrect';
            continue;
        }
        if (isCorrect && !isUserSelected) {
            question.answerCandidates[i].result = 'correct';
            continue;
        }
        if (!isCorrect && isUserSelected) {
            question.answerCandidates[i].result = 'userWrong';
            continue;
        }
        question.answerCandidates[i].result = 'wrong';
    }
}

module.exports.submit = function (req, res, next) {
    var examName = req.params.name;
    var userName = req.body.user;
    var userAllAnswers = parseUserAnswers(req);
    QuestionLibrary.findOne({ name: examName }, function (err, lib) {
        if (err) {
            next(err);
            return;
        } 
        var examReport = lib;
        var correctAnswers = 0;
        for (var i = 0; i < examReport.questions.length; ++i) {
            var question = examReport.questions[i];

            // Check if the answers of this question are correct
            if (compareArray(question.correctAnswerIndex, userAllAnswers[i])) {
                ++correctAnswers;
            }

            // Mark the answer result
            markAnswers(question, userAllAnswers[i]);
        }
        var score = correctAnswers / examReport.questions.length * 100;
        examReport.user = userName;
        examReport.score = score;
        res.render('examReport', { title: lib.displayName + ' Exam Report', examReport: examReport });
    });
};