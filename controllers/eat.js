var models = require('../models');
var Restaurant = models.Restaurant;
var ManagerCode = models.ManagerCode;

function validateManager(req, next) {
    if (req.session.isManager) {
        return true;
    }
    var err = new Error('Forbidden');
    err.status = 403;
    next(err);
    return false;
}

module.exports.index = function(req, res, next) {
    Restaurant.getAll(function(err, restaurants) {
        if (err) {
            next(err);
            return;
        }
        res.render('eat', { title: 'Where to eat?', restaurants: restaurants });
    });
};

module.exports.getAllRestaurants = function(req, res, next) {
    Restaurant.getAll(function (err, restaurants) {
        if (err) {
            next(err);
            return;
        }
        res.send(restaurants);
    });
};

module.exports.addRestaurant = function (req, res, next) {
    if (!validateManager(req, next)) {
        return;
    }
    var restaurant = new Restaurant({ name: req.body.name, hits: 0 });
    restaurant.save(function(err) {
        if (err) {
            next(err);
            return;
        }
        res.send({ result: 'ok' });
    });
};

module.exports.removeRestaurant = function (req, res, next) {
    if (!validateManager(req, next)) {
        return;
    }
    Restaurant.removeById(req.params._id, function(err) {
        if (err) {
            next(err);
            return;
        }
        res.send({ result: 'ok' });
    });
};

module.exports.verifyManagerCode = function(req, res, next) {
    ManagerCode.verify(req.params.managerCode, function(err, isValid) {
        if (err) {
            next(err);
            return;
        }
        req.session.isManager = isValid;
        res.send({ result: isValid });
    });
};

module.exports.checkIsManager = function(req, res) {
    res.send({ result: req.session.isManager });
};