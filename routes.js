var root = require('./routes/index');
var users = require('./routes/users');

module.exports = function(app) {
    app.use('/', root);
    app.use('/users', users);
};
