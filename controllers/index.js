var models = require('../models');
var QuestionLibrary = models.QuestionLibrary;

module.exports.index = function (req, res, next) {
    QuestionLibrary.find({}, { name: 1, '_id': 0 }, function (err, libs) {
        if (err) {
            next(err);
        } else {
            res.render('index', { 'title': 'InterExam Home', 'libs': libs });
        }
    });
};