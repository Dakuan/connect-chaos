var R = require('ramda'),
 	runOnProp = require('../util/run-on-prop');

// sends an error code
function _error(code) {
    var code = code || 500;
    return function _errorHandler(req, res, next) {
        console.log('CHAOS: throwing ' + code);
        res.status(code);
        res.end();
    }
}

module.exports = {
	predicate: R.has('error'),
	factory: runOnProp(_error, 'error')
};