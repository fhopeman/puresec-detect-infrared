var gpio = require("rpi-gpio");
var logger = require("winston");

var _currentValue = false;

var _checkPinValue = function(master, registrationId) {
    return function(error, value) {
        if (!error) {
            if (_currentValue !== value) {
                logger.debug("pin value changed to", value);
                _currentValue = value;
                // send notification if value changed to true
                if (value === true) {
                    logger.info("alarm detected: Send notification to master");
                    master.notify({
                        registrationId: registrationId
                    });
                }
            }
        } else {
            logger.error("read error occured:", error);
        }
    };
};

var start = function(master, registrationId, pin) {
    logger.debug("start listening at pin " + pin);
    gpio.setup(pin, gpio.DIR_IN);

    // implement polling without fs.watch, because the hardware driver doesn't
    // tell the OS that the file was accessed. Because of that the fs.watch
    // callback would never be called and no pin changes would be detected ..
    setInterval(function() {
        gpio.read(pin, _checkPinValue(master, registrationId));
    }, 2000);
};

module.exports =  {
    start: start
};
