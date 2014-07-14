var models = require('../models');
var QuestionLibrary = models.QuestionLibrary;

module.exports.index = function (req, res, next) {
    QuestionLibrary.getAll(function (err, libs) {
        if (err) {
            next(err);
            return;
        } 
        res.render('index', { title: 'InterExam Home', libs: libs });
    });
};