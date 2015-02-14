var subject = require('../../src/handlers/error'),
	R = require('ramda'),
    assert = require('assert');

describe("Error handler", function() {
    describe("when a valid number is provided ", function() {
        it("should use that error code", function() {
            assert(subject.factory({
                error: 420
            }).code === 420);
        });
    });

    describe("when an array is provided", function() {
        it("should use a value from the array", function() {
            assert(subject.factory({
                error: [123]
            }).code === 123);
        });
    });

    describe("when a regex is provided", function() {
        it("should use a value that matches the regex", function() {
            assert(subject.factory({
                error: /^400/
            }).code === 400);
        });
    });
    describe("when nothing is provided", function() {
        it("should use a valid error code", function() {
            var code = subject.factory().code;
            assert(code >= 400);
            assert(code <= 506);
            assert(R.is(Number, code));
        });
    });
});
