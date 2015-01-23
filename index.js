var R = require('ramda'),
    handlers = require('./src/handlers/handlers');

// picks random element from an array
function _randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// checks if value is truthy
function _truthy(val) {
    return !!val;
}

// calls a method on a object with the args
// flipped to accept the object last
var _flipFunc = R.curry(function(method, args, obj){
    return obj[method].apply(null, args);
});

// find the handlers that match the predicates
var _handlersForOptions = R.curry(function(handlers, opts) {
    return R.compose(
        R.map(_flipFunc('factory', R.of(opts))), // build them
        R.filter(_flipFunc('predicate', R.of(opts))) // get the matching handlers
    )(handlers);
});

// full list of built handlers
var allHandlers = R.map(R.func('factory'), handlers);

// find the relevent handlers for the provided options and build them
// if no options are provided, all handlers are built
// after that, pick a random one and return it
var chaos = R.compose(
    _randomElement,
    R.ifElse(_truthy, _handlersForOptions(handlers), R.always(allHandlers))
);

module.exports = chaos;
