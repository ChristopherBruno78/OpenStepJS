#!/usr/bin/env node

"use strict";

const Make = require("./build/Make");
const getopt = require("node-getopt");

let opt = getopt.create([
    ["o", "output=FILE", "output .js file"],
    ["m", "minify", "Minify the output file"],
]);

opt.setHelp("Usage: capp-make [OPTIONS]\n" + "\n" + "[[OPTIONS]]\n" + "\n");

opt.bindHelp();
opt.parseSystem();

let argv = opt.argv;
let options = opt.options;

if (argv.indexOf("clean") > -1) {
    Make.clean();
    process.exit(0);
}

Make.build(options["output"], options["m"] !== undefined);
