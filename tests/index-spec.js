var chaos = require('../src/index'),
    R = require('ramda'),
    Maybe = require('ramda/ext/types/Maybe'),
    assert = require('assert');

// run chaos with n attempts 
// then reduce to the unique values
// this should hopefully give us all the handlers
// that are matching the options.
// its random though, so it might not.
// if we have lots of false negative failures on CCI
// we can bump up the number of attempts
var random = R.curry(function(attempts, chaosOptions) {

    var invokeChaos = function(opts) {
        return function() {
            return chaos(opts)({}, {
                status: function() {},
                end: function() {}
            }, function() {});
        }
    };

    return R.uniq(
        R.map(
            R.compose(
                R.prop('value'),
                R.map(R.prop('name')),
                Maybe,
                invokeChaos(chaosOptions)
            ),

            R.range(0, attempts))
    );
});

var attempt100 = random(100);

describe("connect-chaos", function() {
    describe("when no options are provided", function() {
        it("should return a middleware function", function() {
            assert(chaos().length === 3);
        });
    });

    describe("when an error config option is provided", function() {
        it("might return an error handler", function() {
            var handlerNames = attempt100({
                error: true,
            });
            assert(R.contains('_errorHandler')(handlerNames));
        });
        it("should return a middleware function", function() {
            assert(chaos({
                error: true
            }).length === 3);
        });
    });

    describe("when the delay config option is provided", function() {
        it("might return a delay handler", function() {
            var handlerNames = attempt100({
                delay: true
            });
            assert(R.contains('_delayHandler')(handlerNames));
        });
        it("should return a middleware function", function() {
            assert(chaos({
                delay: true
            }).length === 3);
        });
    });
});
