var models = require('../models');
var Restaurant = models.Restaurant;

module.exports.index = function(req, res, next) {
    Restaurant.find({}, function(err, restaurants) {
        if (err) {
            next(err);
            return;
        }
        res.render('eat', { title: 'Where to eat?', restaurants: restaurants });
    });
};

module.exports.getAllRestaurants = function(req, res, next) {
    Restaurant.find({}, function (err, restaurants) {
        if (err) {
            next(err);
            return;
        }
        res.send(restaurants);
    });
};

module.exports.addRestaurant = function(req, res, next) {
    var restaurant = new Restaurant({ name: req.body.name, hits: 0 });
    restaurant.save(function(err) {
        if (err) {
            next(err);
            return;
        }
        res.send({ result: 'ok' });
    });
};

module.exports.removeRestaurant = function(req, res, next) {
    Restaurant.remove({ _id: req.params._id }, function(err) {
        if (err) {
            next(err);
            return;
        }
        res.send({ result: 'ok' });
    });
};