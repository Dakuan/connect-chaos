var R = require('ramda');


// does nothing
function _throughHandler(req, res, next) {
    console.log('CHAOS: letting this one go...');
    next();
}

function wrap(req, res, next) {
	_throughHandler.apply(null, arguments);
	return _throughHandler;
}

module.exports = {
    predicate: R.always(true),
    factory: R.always(wrap)
};
