var R = require('ramda'),
    randomElement = require('../util/random-element'),
    runOnProp = require('../util/run-on-prop');

var clientErrors = R.range(400, 418);
var serverErrors = R.range(500, 506);
var all = R.concat(clientErrors, serverErrors);

var codeMatchingRegex = function(regex) {
    return R.find(function(c) {
        return R.func('test', regex, c);
    }, all);
};

var parseOpt = R.cond(
    [R.is(Number), R.I], // if number then that pick that error code
    [R.is(Array), randomElement], // if array pick from those
    [R.is(RegExp), codeMatchingRegex], // if regex then code matching that regex
    [R.alwaysTrue, function() {
        return randomElement.call(null, all);
    }] // random error code
);

// sends an error code
function _error(code) {
    return function(req, res, next) {
        var toThrow = parseOpt(code);
        console.log('CHAOS: throwing ' + toThrow);
        res.status(toThrow);
        res.end();
    }
}

module.exports = {
    predicate: R.has('error'),
    factory: runOnProp(_error, 'error')
};
