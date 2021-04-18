#!/usr/bin/env node

"use strict";

const Make = require("./build/Make");
const getopt = require("node-getopt");
const childProcess = require("child_process");
const FS = require("fs");

let opt = getopt.create([
    //future options
]);

opt.setHelp("Usage: oj-run {testName}\n" + "\n" + "[[OPTIONS]]\n" + "\n");

opt.bindHelp();
opt.parseSystem();

let argv = opt.argv;
let options = opt.options;

function runScript(scriptPath, callback) {
    // keep track of whether callback has been invoked to prevent multiple invocations
    let invoked = false;
    let process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on("error", function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on("exit", function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error("exit code " + code);
        callback(err);
    });
}

const tempTestFile = ".test.js";
if (argv.length === 1) {
    const testName = argv[0];
    let out = Make.make(testName);
    let hasError = null;
    for (let idx in out.LOG) {
        let issue = out.LOG[idx];
        if (issue.severity === "error") {
            hasError = issue;
            break;
        }
    }

    if (!hasError) {
        const ObjJ = FS.readFileSync("../Frameworks/Objective-J/Objective-J.js");
        FS.writeFileSync(tempTestFile, ObjJ + "\n" + out.code);
        runScript(tempTestFile, () => {
            FS.unlinkSync(tempTestFile);
        });
    } else {
        console.error("Could not run: " + hasError.message);
    }
} else {
    console.error("Error: No test name specified.");
    process.exit(1);
}
