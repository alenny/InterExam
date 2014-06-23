var express = require('express');
var router = express.Router();
var examController = require('../controllers/index');

// GET home page
router.get('/', function (req, res, next) {
    examController.index(req, res, next);
});

module.exports = router;
