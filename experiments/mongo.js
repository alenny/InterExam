var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    pin: String
});
var User = mongoose.model('User', UserSchema);
mongoose.connect('mongodb://127.0.0.1/interexam');
var db = mongoose.connection;

db.once('open', function () {
    console.log('DB is connected.');

    User.find({}, function(err, users) {
        if (err) {
            console.log('Find failed. ' + err);
        } else {
            //console.log(users);
            for (var i=0;i<users.length;i++) {
                console.log(users[i]);
            }
        }
        db.close(function (err) {
            if (err) {
                console.log('Close failed. ' + err);
            } else {
                console.log('DB is closed.');
            }
        });
    });

    //admin.save(function (err, user) {
    //    if (err) {
    //        console.log('Save failed. ' + err);
    //    } else {
    //        console.log('Saved.');
    //    }
    //});
});
