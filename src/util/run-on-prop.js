var R = require('ramda'),
	Maybe = require('ramda/ext/types/Maybe');

// returns a function that expects an object with a property containing a config variable
// if the variable is not a number it is ignored
function _runOnProp(fn, prop) {
    return R.compose(
    	fn, // apply the function
    	R.prop('value'), // unwrap the monad
    	R.map(R.prop(prop)), // get the prop if the argument is truthy
    	Maybe // Maybe null
    );
}

module.exports = _runOnProp;