connect-chaos
=============

[![Circle CI](https://circleci.com/gh/Dakuan/connect-chaos.svg?style=svg&circle-token=be329dbcfa94b3635df9ae15d1f89133e5b05a95)](https://circleci.com/gh/Dakuan/connect-chaos)

<img src="http://i.imgur.com/jFqfW4e.gif" width="100%" />

## Connect / Express middleware that causes chaos

This is loosely inspired by [chaos monkey](https://github.com/Netflix/SimianArmy/wiki/Chaos-Monkey). The basic idea is that you can drop it into your connect / express app and see how your clients get on when things go wrong. You might want to have it enabled by an environment variable so you can switch it on and off easily.

## Installation

``` bash
$ npm install connect-chaos
```

## Usage

``` javascript
var chaos = require('connect-chaos');

// anything can happen
app.use(chaos());

// requests might be delayed by 2000ms (default)
app.use(chaos({
  delay: true
});

// requests might be delayed by specified value
app.use(chaos({
  delay: 300
});

// requests might return an error code
// Client error codes: 400, 401, 402, 403, 404, 405, 406, 407, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417
// Server Error codes: 500, 501, 502, 503, 504, 505
app.use(chaos({
  error: true
});

// requests might return specified code
app.use(chaos({
  error: 401
});

// requests might return a code in the array
app.use(chaos({
  error: [404, 500]
}));

// requests might return a code that matches the regex
app.use(chaos(){
  error: /^40/
});

// requests might return an erro code or be delayed by 6000ms
app.use(chaos({
  error: true,
  delay: 6000
});
```
