#!/usr/bin/env node

"use strict"

const { execSync }          = require('child_process');
const getopt                = require('node-getopt');
const build                 = require('./Build');

let opt = getopt.create([
    ["o", "output=FILE", "output .js file in the build directory"]
]);

opt.setHelp(
    "Usage: openstep-js-make [OPTIONS]\n" +
    "\n" +
    "[[OPTIONS]]\n" +
    "\n"
);

opt.bindHelp();
opt.parseSystem();

let argv = opt.argv;
let options = opt.options;

if(argv.length === 1) {
    if(argv[0] === 'clean') {
        execSync("make clean");
        process.exit(0);
    }
    else {
        console.error(`Error: Invalid option "${argv[0]}".`)
        process.exit(1);
    }
}

build(options["output"]);



