"use strict"

/**
 * Generates the Makefile of the OpenStepJS project
 */

const PATH = require('path'),
      FS = require('fs');

const findBaseDirectory = require('./FindBaseDirectory');

const HOME_DIR = findBaseDirectory(process.cwd(), 'package.json');
const BUILD_FOLDER = PATH.join(HOME_DIR, 'build');
const MAKEFILE_PATH = PATH.join(HOME_DIR, "Makefile");

function getObjectFileName(source) {
    let baseName = PATH.basename(source);
    let idx = baseName.indexOf('.');
    return baseName.substr(0, idx) +".oj";
}

module.exports = function(sourceFile, dependencyFiles) {

    FS.mkdirSync(BUILD_FOLDER, {recursive: true});
    let rules = "";
    let objects = "build: ";
    for (let i in dependencyFiles) {
        let filePath = PATH.relative(HOME_DIR, dependencyFiles[i]);
        let dest = PATH.relative(
                HOME_DIR,
                PATH.join(BUILD_FOLDER, getObjectFileName(filePath))
            );
        objects += (dest + " ");
        rules += (dest + ": " + filePath + "\n");
        rules += ("\tojc " + filePath + " -o " + dest + "\n\n");
    }

    let sourceDest = (PATH.relative(
        HOME_DIR,
        PATH.join(BUILD_FOLDER, getObjectFileName(sourceFile))
    ));
    let sourceFileRelative = PATH.relative(HOME_DIR, sourceFile);

    objects += sourceDest;
    rules += (sourceDest + ": " + sourceFileRelative + "\n");
    rules += ("\tojc " + sourceFileRelative + " -o " + sourceDest + "\n\n");

    let makeFileOut = objects + "\n\n" + rules;
    makeFileOut += ("clean:\n");
    makeFileOut += ("\trm -rf "+PATH.relative(HOME_DIR, BUILD_FOLDER));

    FS.writeFileSync(MAKEFILE_PATH, makeFileOut, 'utf8');

}


