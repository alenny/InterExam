var assert = require('assert');
var express = require('express');
var app = express();
describe('Test code', function() {
    describe('Test method', function() {
        it('Any test', function () {

            function ba() {
                b = 1;
            }

            ba();
            assert.equal(1, b);
        });
    });
});