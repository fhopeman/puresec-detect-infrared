var express = require("express");
var logger = require("winston");
var puresecMicroservice = require("puresec-microservice-js");
var irDetector = require("./irDetector");

// settings
logger.level = "debug";

// read application properties
var urlMaster = process.env.MASTER_URL || process.argv[2] || "http://localhost:3000";
var name = process.env.NAME || process.argv[3] || "IR Detector";
var description = process.env.DESCRIPTION || process.argv[4] || "";
var pin = process.env.PIN || process.argv[5] || 7;
var port = process.env.PORT || process.argv[6] || 3003;

// services
var app = express();
var master = puresecMicroservice.master(urlMaster);
var utils = puresecMicroservice.utils();
var webApp = puresecMicroservice.webApp();

// register endpoints
webApp.registerHealthCheckEndpoint(app);

app.listen(port, function () {
    // register
    master.register({
        name: name,
        description: description,
        type: "detector",
        address: utils.currentAddress(port),
        onSuccess: function(jsonBody) {
            logger.info("registration successful", jsonBody);
            irDetector.start(master, jsonBody.id, pin);
        },
        onError: function(error) {
            logger.error("registration failed, exiting now", error);
            process.exit(1);
        }
    });

});
