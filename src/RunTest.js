#!/usr/bin/env node

"use strict"


const Make          	= require("./build/Make");
const getopt        	= require("node-getopt");
const childProcess 		= require('child_process');
const FS 				= require("fs");

let opt = getopt.create([
	//future options
]);

opt.setHelp(
    "Usage: oj-test {testName}\n" +
    "\n" +
    "[[OPTIONS]]\n" +
    "\n"
);

opt.bindHelp();
opt.parseSystem();

let argv = opt.argv;
let options = opt.options;


function runScript(scriptPath, callback) {
    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}


const tempTestFile = "._test_.js";
if (argv.length === 1) {
    const testName = argv[0];
	const ObjJ = FS.readFileSync("../Frameworks/Objective-J/Objective-J.js")
    let context = { global : {}};
    let out = Make.make(testName) 
	FS.writeFileSync(tempTestFile, ObjJ+"\n"+out.code);
	runScript(tempTestFile, () => {
		FS.unlinkSync(tempTestFile);
	});
	
}
else {
    console.error("Error: No test name specified.");
    process.exit(1);
}