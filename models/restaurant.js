var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    name: { type: String, unique: true },
});

mongoose.model('Restaurant', RestaurantSchema);