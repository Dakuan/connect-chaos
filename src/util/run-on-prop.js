var R = require('ramda'),
	Maybe = require('ramda/ext/types/Maybe');

// returns a function that expects an object with a property containing a config variable
// if the variable is not a number it is ignored
function _runOnProp(fn, prop) {
    return R.compose(
    	fn, // apply the function
    	R.prop('value'), // unwrap the monad
    	// R.map(R.I),
    	// R.map(R.ifElse(R.is(Number), R.I, R.always())), // if the prop isn't a number use undefined
    	R.map(R.prop(prop)), // get the prop if the argument is truthy
    	Maybe // Maybe null
    );
}

module.exports = _runOnProp;