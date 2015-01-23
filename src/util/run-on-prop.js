var R = require('ramda');

// returns a function that expects an object with a property containing a config variable
// if the variable is not a number it is ignored
function _runOnProp(fn, prop) {
	// if the args aren't a number use null instead
    var parseArgs = R.ifElse(R.is(Number), R.I, R.always());
    // if the args are not an object, use empty hash instead
    var coalesceToObject = R.ifElse(R.is(Object), R.I, R.always({}))
    return R.compose(fn, parseArgs, R.prop(prop), coalesceToObject);
}

module.exports = _runOnProp;