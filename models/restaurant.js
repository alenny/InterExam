var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    name: { type: String, unique: true },
    hits: { type: Number }
});

RestaurantSchema.statics.getAll = function(cb) {
    this.find({}, cb);
};

mongoose.model('Restaurant', RestaurantSchema);