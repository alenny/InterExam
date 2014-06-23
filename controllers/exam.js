var models = require('../models');
var QuestionLibrary = models.QuestionLibrary;

module.exports.index = function (req, res, next) {
    var examName = req.params.name;
    QuestionLibrary.findOne({ name: examName }, function(err, lib) {
        if (err) {
            next(err);
        } else {
            res.render('exam', { title: lib.name + ' Exam', lib: lib });
        }
    });
};