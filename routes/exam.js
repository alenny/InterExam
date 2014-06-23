var express = require('express');
var router = express.Router();
var examController = require('../controllers/exam');

// GET home page
router.get('/:name', function (req, res, next) {
    examController.index(req, res, next);
});

router.post('/:name', function (req, res, next) {
    examController.submit(req, res, next);
});

module.exports = router;
