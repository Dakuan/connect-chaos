var chaos = require('./index');

chaos({
    error: 400,
    delay: true
})(null, {
    status: function() {},
    end: function() {}
}, function() {});
