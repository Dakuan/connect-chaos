var R = require('ramda');

// picks random element from an array
function _randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// checks if value is truthy
function _truthy(val) {
    return !!val;
}

// delays the request a bit
function _delay(time) {
    var time = time || 2000;
    return function _delayHandler(req, res, next) {
        console.log('CHAOS: delaying by ' + time);
        setTimeout(function() {
            next();
        }, time);
    }
}

// sends an error code
function _error(code) {
    var code = code || 500;
    return function _errorHandler(req, res, next) {
        console.log('CHAOS: throwing ' + code);
        res.status(code);
        res.end();
    }
}

// does nothing
function _through() {
    return function _throughHandler(req, res, next) {
        console.log('CHAOS: letting this one go...');
        next();
    }
}

// returns a function that expects an object with a property containing a config variable
// if the variable is not a number it is ignored
function _runOnProp(fn, prop) {
    var parseArgs = R.ifElse(R.is(Number), R.I, R.always());
    return R.compose(fn, parseArgs, R.prop(prop));
}

// reduces the list of handlers to those that are valid
function _handlersForOptions(opts) {
    return R.reduce(function(memo, pair) {
        if (pair[0](opts)) {
            memo.push(pair[1](opts));
        }
        return memo;
    }, [], potentialHandlers);
}

// list of all the handlers and the predicates that decide if they are valid
var potentialHandlers = [
    [R.always(true), _through],
    [R.has('delay'), _runOnProp(_delay, 'delay')],
    [R.has('error'), _runOnProp(_error, 'error')]
];

// full list of built handlers
var allHandlers = [_delay(), _error(), _through()];

// find the relevent handlers for the provided options and build them
// if no options are provided, all handlers are built
// after that, pick a random one and reuturn it
var chaos = R.compose(
    _randomElement,
    R.ifElse(_truthy, _handlersForOptions, R.always(allHandlers))
);

module.exports = chaos;

