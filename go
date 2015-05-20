#!/bin/bash
set -e

installDependencies() {
    npm install
}

build() {
    ./node_modules/.bin/grunt
}

run() {
    nodejs ./src/app.js
}

main() {
    if [ ! -d node_modules ]; then
        installDependencies
    fi

    build
    run
}
main
