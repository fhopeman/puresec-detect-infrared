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
4. now it's time to wire the IR-sensor. I'm using the HC-SR501. The VCC is connected to one of the
   5V pins, the GND to one of the GND pins and the out (data) pin to GPIO4/PIN7. Later on you can
   configure the pin of your choice.
5. run the following command to start the microservice:

   `node src/app.js`

   Following options are configurable via env properties:

| Property    | Default                 |
|-------------|-------------------------|
| MASTER_URL  | http://localhost:3000   |
| NAME        | IR Detector             |
| DESCRIPTION |                         |
| PORT        | 3003                    |
| PIN         | 7                       |

   The start command with properties:
   
   `MASTER_URL="http://url/to/master:port" [some other properties] node src/app.js`
