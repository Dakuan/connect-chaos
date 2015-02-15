var subject = require('../../src/handlers/error'),
    R = require('ramda'),
    assert = require('assert');

function assertStatus(handler, expectedCode) {
    handler(null, {
        status: function(code) {
            assert(code === expectedCode);
        },
        end: function() {}
    });
}

describe("Error handler", function() {
    describe("when a valid number is provided ", function() {
        it("should use that error code", function() {
            var handler = subject.factory({
                error: 420
            });
            assertStatus(handler, 420);
        });
    });

    describe("when an array is provided", function() {
        it("should use a value from the array", function() {
            var handler = subject.factory({
                error: [123]
            });
            assertStatus(handler, 123);
        });
    });

    describe("when a regex is provided", function() {
        it("should use a value that matches the regex", function() {
            var handler = subject.factory({
                error: /^400/
            });
            assertStatus(handler, 400);
        });
    });

    describe("when nothing is provided", function() {
        it("should use a valid error code", function() {
            var handler = subject.factory();
            handler(null, {
                status: function(code) {
                    assert(code >= 400);
                    assert(code <= 506);
                    assert(R.is(Number, code));
                },
                end: function() {}
            });
        });
    });
});
