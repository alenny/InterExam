var assert = require('assert');
var express = require('express');
var app = express();
describe('Test code', function() {
    describe('Test method', function() {
        it('Any test', function () {
            //assert.equal(false, []);
            assert.equal(app.get('env'), 'development');
            assert.equal(process.env['NODE_ENV'], 'production');
        });
    });
});