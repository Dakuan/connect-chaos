var R = require('ramda');

function _delay(time) {
    var time = time || 2000;
    return function(req, res, next) {
        setTimeout(function() {
            console.log('CHAOS: delaying by ' + time);
            next();
        }, time);
    }
}

function _error(code) {
    var code = code || 500;
    return function(req, res, next) {
        console.log('CHAOS: throwing ' + code);
        res.status(code);
        res.end();
    }
}

function _randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function _truthy(val) {
    return !!val;
}

var parseArgs = R.ifElse(R.is(Number), R.I, R.always(null));

function runOnProp(fn, prop) {
    return R.compose(fn, parseArgs, R.prop(prop));
}

var chaos = R.ifElse(
    _truthy,
    R.cond(
        [R.has('delay'), runOnProp(_delay, 'delay')],
        [R.has('error'), runOnProp(_error, 'error')]
    ),
    _randomElement([_delay, _error])
);

module.exports = chaos;

// use

// // anything can happen
// root.use(chaos());

// // delays by 2000 ms (default)
// root.use(chaos({
//     time: true
// }));

// // delays by custom time
// root.use(chaos({
//     time: 4000
// }));

// // throws 500 error (default)
// root.use(chaos({
//     error: true
// }));

// // throws custom error code
// root.use(chaos({
//     error: 401
// }));
