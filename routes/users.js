var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

router.get('/', function (req, res, next) {
    usersController.index(req, res, next);
});

module.exports = router;
