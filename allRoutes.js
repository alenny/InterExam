var root = require('./routes/index');
var users = require('./routes/users');
var exam = require('./routes/exam');

module.exports = function(app) {
    app.use('/', root);
    app.use('/users', users);
    app.use('/exam', exam);
};
