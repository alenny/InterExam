var express = require('express');
var router = express.Router();
var models = require('../models');
var QuestionLibrary = models.QuestionLibrary;

// GET home page
router.get('/', function (req, res) {
    QuestionLibrary.find({}, { name: 1, '_id': 0 }, function(err, libs) {
        if (err) {
            res.send(err);
        } else {
            res.render('index', { title: 'InterExam', libs: libs });
        }
    });
});

module.exports = router;
