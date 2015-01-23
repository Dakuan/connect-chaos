var R = require('ramda');


// does nothing
function _throughHandler(req, res, next) {
    console.log('CHAOS: letting this one go...');
    next();
}

module.exports = {
    predicate: R.always(true),
    factory: R.always(_throughHandler)
};
