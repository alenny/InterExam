var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    pin: String
});
var User = mongoose.model('User', UserSchema);

/* GET users listing. */
router.get('/', function (req, res) {
    mongoose.connect('mongodb://127.0.0.1/interexam');
    var db = mongoose.connection;
    db.once('open', function () {
        User.find({}, function (err, users) {
            if (err) {
                res.send(err);
            } else {
                res.send(users);
            }
            db.close();
        });
    });
});

module.exports = router;
