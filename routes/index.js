var express = require('express');
var models = require('../models/models');

var QuestionLibrary = models.QuestionLibrary;
var router = express.Router();

// GET home page
router.get('/', function (req, res) {
    QuestionLibrary.find({}, { name: 1 }, function(err, libs) {
        if (err) {
            res.send(err);
        } else {
            res.render('index', { title: 'InterExam', libs: libs });
        }
    });
});

module.exports = router;
