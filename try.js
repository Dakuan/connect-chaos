var chaos = require('./index');

chaos({
    error: 400,
    delay: 100
})(null, {
    status: function() {},
    end: function() {}
}, function() {});
