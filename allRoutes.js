var root = require('./routes');
var users = require('./routes/users');
var exam = require('./routes/exam');
var eat = require('./routes/eat');

module.exports = function(app) {
    app.use('/', root);
    app.use('/users', users);
    app.use('/exam', exam);
    app.use('/eat', eat);
};
