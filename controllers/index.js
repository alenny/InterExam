//var models = require('../models');
//var QuestionLibrary = models.QuestionLibrary;

module.exports.index = function (req, res, next) {
    res.send('hello all!');
    //QuestionLibrary.find({}, { name: 1, displayName: 1, '_id': 0 }, function (err, libs) {
    //    if (err) {
    //        next(err);
    //        return;
    //    } 
    //    res.render('index', { title: 'InterExam Home', libs: libs });
    //});
};