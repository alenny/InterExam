var express = require('express');
var router = express.Router();
var eatController = require('../controllers/eat');

router.get('/', function(req, res, next) {
    eatController.index(req, res, next);
});

router.get('/restaurants', function(req, res, next) {
    eatController.getAllRestaurants(req, res, next);
});

router.post('/restaurants', function (req, res, next) {
    eatController.addRestaurant(req, res, next);
});

router.delete('/restaurants/:_id', function(req, res, next) {
    eatController.removeRestaurant(req, res, next);
});

module.exports = router;