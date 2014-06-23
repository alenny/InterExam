var express = require('express');
var router = express.Router();
var examController = require('../controllers/exam');

// GET home page
router.get('/:name', function (req, res, next) {
    examController.index(req, res, next);
});

module.exports = router;
