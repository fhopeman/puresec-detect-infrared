var testee = require('../src/irDetector');

var gpio = require("rpi-gpio");
var assert = require("assert");
var sinon = require("sinon");

describe("irDetector", function() {
    var PIN_VALUE_HIGH = true;
    var PIN_VALUE_LOW = false;

    var gpioReadStub;
    var gpioSetupStub;

    beforeEach(function() {
        this.clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        if (gpioReadStub) {
            gpioReadStub.restore();
        }
        if (gpioSetupStub) {
            gpioSetupStub.restore();
        }

        this.clock.restore();
    });

    it("should be initialized", function() {
        assert.notEqual(testee, undefined);
    });

    it("should start the detection", function() {
        // given
        gpioReadStub = sinon.stub(gpio, "read");
        gpioSetupStub = sinon.stub(gpio, "setup");

        // when
        testee.start({}, 7, 9);
        this.clock.tick(3001);

        // then
        assert(gpioReadStub.withArgs(9, sinon.match.func).calledOnce);
        assert(gpioSetupStub.withArgs(9, "in").calledOnce);
    });

    it("should notify the master if pin value is changed to 1", function() {
        // given
        gpioReadStub = sinon.stub(gpio, "read").yields(undefined, PIN_VALUE_HIGH);
        gpioSetupStub = sinon.stub(gpio, "setup");
        var master = {
            notify: function() {}
        };
        var masterSpy = sinon.spy(master, "notify");

        // when
        testee.start(master, 7, 9);
        this.clock.tick(3001);

        // then
        assert(masterSpy.withArgs({registrationId: 7}).calledOnce);
    });

    it("should not notify the master if pin value is changed to 0", function() {
        // given
        gpioReadStub = sinon.stub(gpio, "read").yields(undefined, PIN_VALUE_LOW);
        gpioSetupStub = sinon.stub(gpio, "setup");
        var master = {
            notify: function() {}
        };
        var masterSpy = sinon.spy(master, "notify");

        // when
        testee.start(master, 7, 11);
        this.clock.tick(3001);

        // then
        assert(masterSpy.withArgs({registrationId: 7}).notCalled);
    });

    it("should not notify the master if pin value doesn't change", function() {
        // given
        gpioReadStub = sinon.stub(gpio, "read").yields(undefined, PIN_VALUE_HIGH);
        gpioSetupStub = sinon.stub(gpio, "setup");
        var master = {
            notify: function() {}
        };
        var masterSpy = sinon.spy(master, "notify");

        // when
        testee.start(master, 7, 11);
        this.clock.tick(3001);
        this.clock.tick(3001);

        // then
        assert(masterSpy.withArgs({registrationId: 7}).calledOnce);
    });

    it("should not notify the master if read error occurs", function() {
        // given
        gpioReadStub = sinon.stub(gpio, "read").yields({some: "error occured"}, PIN_VALUE_HIGH);
        gpioSetupStub = sinon.stub(gpio, "setup");
        var master = {
            notify: function() {}
        };
        var masterSpy = sinon.spy(master, "notify");

        // when
        testee.start(master, 7, 11);
        this.clock.tick(3001);

        // then
        assert(masterSpy.withArgs({registrationId: 7}).notCalled);
    });
});
