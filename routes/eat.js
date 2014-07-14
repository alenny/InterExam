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

router.get('/verifymanagercode/:managerCode', function(req, res, next) {
    eatController.verifyManagerCode(req, res, next);
});

router.get('/ismanager', function(req, res) {
    eatController.checkIsManager(req, res);
});

module.exports = router;