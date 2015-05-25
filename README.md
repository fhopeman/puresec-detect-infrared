# puresec-detect-infrared [![Build Status](https://travis-ci.org/fhopeman/puresec-detect-infrared.svg?branch=master)](https://travis-ci.org/fhopeman/puresec-detect-infrared)

This microservice is supposed to be an infrared detector. All movement detections will
trigger a master notification. The master can decide what to do with this message (e.g.
send a mail).

## Preconditions
First of all you need a raspberry pi with installed [linux distribution](https://www.raspberrypi.org/downloads/).

## Usage
1. clone repository to your rasbperry pi and change directory to the created folder
2. run `./bin/setupServer.sh` to install npm, node and other dependencies
3. try to run `grunt`. If all tests passing, you are ready to start
4. run the following command to start the microservice:
   `MASTER_URL="http://url/to/master:port" node src/app.js`
