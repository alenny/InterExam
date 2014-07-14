var mongoose = require('mongoose');
var async = require('async');
var models = require('../models');

var manageCode = new models.ManagerCode({
   code: 'dzygood' 
});

// Close DB connection
var closeDbConnection = function (conn) {
    conn.close(function () {
        console.log('DB is disconnected.');
    });
};

var conn = mongoose.connection;
var db = conn.db;
conn.once('open', function () {
    manageCode.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Insert new manager code successfully.');
        }
        closeDbConnection(conn);
    });
});