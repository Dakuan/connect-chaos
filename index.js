var R = require('ramda');

function _delay(time) {

    // console.log(time);
    var time = time || 2000;

    console.log('delaying by ' + time);
    return function(req, res, next) {
        setTimeout(function() {
            next();
        }, time);
    }
}

function _error(code) {
    var code = code || 500;
    console.log('throwing ' + code);
    return function(req, res, next) {
        res.status(code);
        res.end();
    }
}

function _funnyInvoke(fn, o) {
    return function(args) {
        return fn.call(fn, parseArgs(o.call(o, args)));
    }
}

function _buildAction(prop) {
    return;
}

function _randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function _truthy(val) {
    return !!val;
}

var isNumber = R.is(Number);

var parseArgs = R.ifElse(isNumber, R.I, R.always(null));

var chaos = R.ifElse(
    _truthy,
    R.cond(
        [R.has('delay'), _funnyInvoke(_delay, R.prop('delay'))], [R.has('error'), _funnyInvoke(_error, R.prop('error'))]
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
