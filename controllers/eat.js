var models = require('../models');
var Restaurant = models.Restaurant;

module.exports.index = function(req, res, next) {
    Restaurant.find({}, { name: 1, '_id': 0 }, function(err, restaurants) {
        if (err) {
            next(err);
            return;
        }
        res.render('eat', { title: 'Where to eat?', restaurants: restaurants });
    });
};

