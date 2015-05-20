var express = require('express');
var logger = require('winston');
var puresecMicroservice = require("puresec-microservice-js");

// read application properties
var urlMaster = process.env.MASTER_URL || process.argv[2] || "http://localhost:3000";
var port = process.env.PORT || process.argv[3] || 3003;

// services
var app = express();
var master = puresecMicroservice.master(urlMaster);
var utils = puresecMicroservice.utils();
var webApp = puresecMicroservice.webApp();

// register endpoints
webApp.registerHealthCheckEndpoint(app);

app.listen(port, function () {

});
