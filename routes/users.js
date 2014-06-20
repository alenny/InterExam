var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;

/* GET users listing. */
router.get('/', function (req, res) {
    User.find({}, { '_id': 0 }, function (err, users) {
        if (err) {
            res.send(err);
        } else {
            res.render('users', { title: 'InterExam', users: users });
        }
    });
});

module.exports = router;
