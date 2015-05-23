var gpio = require("rpi-gpio");
var logger = require("winston");

var _onIrChange = function(master, registrationId) {
    return function(pin, value) {
        logger.debug("PIN " + pin + " is now " + value);
        if (value === 1) {
            master.notify({
                registrationId: registrationId
            });
        }
    };
};

var start = function(master, registrationId, pin) {
    gpio.on("change", _onIrChange(master, registrationId));
    gpio.setup(pin, gpio.DIR_IN);
};

module.exports =  {
    start: start
};
