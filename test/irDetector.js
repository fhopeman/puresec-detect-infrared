var testee = require('../src/irDetector');

var gpio = require("rpi-gpio");
var assert = require("assert");
var sinon = require("sinon");

describe("irDetector", function() {
    var PIN_VALUE_HIGH = 1;
    var PIN_VALUE_LOW = 0;

    var gpioOnChangeListenerStub;
    var gpioSetupStub;

    afterEach(function () {
        if (gpioOnChangeListenerStub) {
            gpioOnChangeListenerStub.restore();
        }
        if (gpioSetupStub) {
            gpioSetupStub.restore();
        }
    });

    it("should be initialized", function() {
        assert.notEqual(testee, undefined);
    });

    it("should start the detection", function() {
        // given
        gpioOnChangeListenerStub = sinon.stub(gpio, "on");
        gpioSetupStub = sinon.stub(gpio, "setup");

        // when
        testee.start({}, 7, 9);

        // then
        assert(gpioOnChangeListenerStub.calledOnce);
        assert(gpioSetupStub.withArgs(9, "in").calledOnce);
    });

    it("should notify the master if pin value is changed to 1", function() {
        // given
        gpioOnChangeListenerStub = sinon.stub(gpio, "on").yields(9, PIN_VALUE_HIGH);
        gpioSetupStub = sinon.stub(gpio, "setup");
        var master = {
            notify: function() {}
        };
        var masterSpy = sinon.spy(master, "notify");

        // when
        testee.start(master, 7, 9);

        // then
        assert(masterSpy.withArgs({registrationId: 7}).calledOnce);
    });

    it("should not notify the master if pin value is changed to 0", function() {
        // given
        gpioOnChangeListenerStub = sinon.stub(gpio, "on").yields(11, PIN_VALUE_LOW);
        gpioSetupStub = sinon.stub(gpio, "setup");
        var master = {
            notify: function() {}
        };
        var masterSpy = sinon.spy(master, "notify");

        // when
        testee.start(master, 7, 11);

        // then
        assert(masterSpy.withArgs({registrationId: 7}).notCalled);
    });
});
