var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ManagerCodeSchema = new Schema({
    code: { type: String, unique: true },
});

ManagerCodeSchema.statics.verify = function (managerCode, cb) {
    this.findOne({ code: managerCode }, function (err, data) {
        var isValid = (err == null && data != null);
        cb(err, isValid);
    });
};

mongoose.model('ManagerCode', ManagerCodeSchema);