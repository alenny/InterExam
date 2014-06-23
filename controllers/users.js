var models = require('../models');
var User = models.User;

module.exports.index = function(req, res, next) {
    User.find({}, { name: 1, '_id': 0 }, function(err, users) {
        if (err) {
            next(err);
            return;
        } 
        res.render('users', { title: 'InterExam Users', users: users });
    });
};