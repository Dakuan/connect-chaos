var R = require('ramda'),
    runOnProp = require('../util/run-on-prop');

// delays the request a bit
function _delay(time) {
    var time = time || 2000;
    function _delayHandler(req, res, next) {
        console.log('CHAOS: delaying by ' + time);
        setTimeout(function() {
            next();
        }, time);
    }

    return function(req, res, next) {
        _delayHandler.apply(null, arguments);
        return _delayHandler;
    }
}

module.exports = {
	predicate: R.has('delay'),
	factory: runOnProp(_delay, 'delay')
};