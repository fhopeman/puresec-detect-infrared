# puresec-detect-infrared [![Build Status](https://travis-ci.org/fhopeman/puresec-detect-infrared.svg?branch=master)](https://travis-ci.org/fhopeman/puresec-detect-infrared)

This microservice is part of the [puresec ecosystem](https://github.com/fhopeman/puresec-master) and is supposed to be an infrared detector. All movement detections will
trigger a master notification. The master can decide what to do with this message (e.g.
send a mail).

## Preconditions
First of all you need a raspberry pi with installed [linux distribution](https://www.raspberrypi.org/downloads/).

## Usage
Firstly, clone repository to your rasbperry pi and change directory to the created folder.

Then you can run the `./bin/setupServer.sh` script to install npm, node and other dependencies which the microservice needs to run properly. After the script is finished, try to run `grunt`. If all tests passing, you are ready to start with the wiring of the IR-sensor.

### Wiring
I'm using the HC-SR501. The VCC is connected to one of the
5V pins, the GND to one of the GND pins and the out (data) pin to GPIO4/PIN7. Later on you can
configure a data pin of your choice.

### Run the service
Now you are ready to start the service with the following command:

   `node src/app.js`

### Options

Following options are configurable via env properties:

|Property    | Description                | Default               |
|-------------|---------------------------|-----------------------|
|MASTER_URL  | URL of the master          | http://localhost:3000 |
|NAME        | Name of the service        | IR Detector           |
|DESCRIPTION | Description of the service |                       |
|PORT        | Port of the service        | 3003                  |
|PIN         | Pin of the data lane       | 7                     |

The start command with an example property:

`MASTER_URL="http://url/to/master:port" [some other properties] node src/app.js`
