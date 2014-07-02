var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    name: { type: String, unique: true },
    hits: { type: Number }
});

mongoose.model('Restaurant', RestaurantSchema);