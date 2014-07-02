var express = require('express');
var router = express.Router();
var eatController = require('../controllers/eat');

router.get('/', function(req, res, next) {
    eatController.index(req, res, next);
});

module.exports = router;