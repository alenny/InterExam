var async = require('async');

async.series([
    function (callback) {
        var loopCount = 0;
        var loopFunc = function() {
            console.log('1');
            loopCount++;
            if (loopCount < 3) {
                setTimeout(loopFunc, 1000);
            } else {
                callback(null);
            }
        };
        loopFunc();
    }, function(callback) {
        var loopCount = 0;
        var loopFunc = function() {
            console.log('2');
            loopCount++;
            if (loopCount < 3) {
                setTimeout(loopFunc, 1000);
            } else {
                callback(null);
            }
        };
        loopFunc();
    }
], function() {
    console.log('callback');
});

console.log('finished');