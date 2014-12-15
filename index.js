function _delay(time) {
    var time = time || 2000;
    return function(req, res, next) {
        setTimeout(function() {
            next();
        }, time);
    }
}

module.exports = function(opts) {
    return function(req, res, next) {
    	_delay(opts.time).apply(null, arguments);
    }
};
