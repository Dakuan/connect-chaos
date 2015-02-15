var express = require('express'),
    app = express(),
    chaos = require('../src/index');

app.use(chaos());

app.get('/', function(req, res, next) {
    res.send('CHAOS: hello from example, it looks like this request got through');
});

app.listen(3009, function() {
    console.log('booted chos example app on 3009');
});
