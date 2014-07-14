var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    name: { type: String, unique: true },
    hits: { type: Number }
});

RestaurantSchema.statics.getAll = function(cb) {
    this.find({}, cb);
};

RestaurantSchema.statics.removeById = function(id, cb) {
    this.remove({ _id: id }, cb);
};

mongoose.model('Restaurant', RestaurantSchema);