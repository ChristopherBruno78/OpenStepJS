"use strict"

const FS                    = require('fs'),
    PATH                  = require('path');

const { execSync }          = require('child_process');
const Uglify                = require('uglify-js');
const _                     = require('lodash');

const parseDependencies     = require('./ParseDependencies');
const generateMakefile      = require('./GenerateMakefile');
const findBaseDirectory     = require('./FindBaseDirectory');

const HOME_DIR = findBaseDirectory(process.cwd(), "package.json");
const BUILD_DIR = PATH.join(HOME_DIR, "build");
const PKG_LOC = PATH.join(HOME_DIR, "package.json");

function getObjectFileName(source) {
    let baseName = PATH.basename(source);
    let idx = baseName.indexOf('.');
    return baseName.substr(0, idx) +".oj";
}


module.exports = function(outputFile) {
    //read package json to find main file
    const pkgJSON = require(PKG_LOC);
    if(!pkgJSON.main) {
        console.error("Error: No main file defined in package.json");
        process.exit(1);
    }

    const SRC_DIR = PATH.join(HOME_DIR, 'src');
    const MAIN_FILE_PATH = PATH.join(SRC_DIR, pkgJSON.main);

    if(!FS.existsSync(MAIN_FILE_PATH)) {
        console.error(`Error: No such main file: ${MAIN_FILE_PATH}`);
        process.exit(1);
    }

    //gather dependencies
    let dependencyFiles = parseDependencies(MAIN_FILE_PATH);

    //generate Makefile
    generateMakefile(MAIN_FILE_PATH, dependencyFiles);
    //run Makefile
    process.chdir(HOME_DIR)
    execSync("make > " + PATH.join(BUILD_DIR, "build.log"));

    //add the runtime
    FS.writeFileSync(PATH.join(BUILD_DIR, "Objective-J.js"),
            FS.readFileSync(
                PATH.join(HOME_DIR, "Frameworks/Objective-J/Objective-J.js"),
                "utf8"
            ),
            "utf8"
    );

    //write out object files
    const objectFiles = dependencyFiles.map((file) => {
        return PATH.join(BUILD_DIR, getObjectFileName(file))
    });

    objectFiles.push(
        PATH.join(BUILD_DIR, getObjectFileName(MAIN_FILE_PATH))
    );

    let outCode = "";
    objectFiles.forEach((filePath) => {
        outCode += Uglify.minify(
            FS.readFileSync(filePath, 'utf8')
        ).code;
    });

    if(!outputFile) {
        outputFile = "build.js";
    }

    //create the final JS
    FS.writeFileSync(PATH.join(HOME_DIR, `build/${outputFile}`), outCode, 'utf8');

    return objectFiles.map((filePath) => {
        return PATH.relative(HOME_DIR, filePath);
    });
}