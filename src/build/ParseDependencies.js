"use strict"

/**
 * Generates an array of dependencies in the OpenStepJS project
 */


const parseImports  = require('./lib/parse-imports'),
    FS              = require('fs'),
    PATH            = require('path'),
    _               = require('lodash');


const findBaseDirectory = require('./FindBaseDirectory');

function parse(data) {
    let dependencies = [];
    let theImports = parseImports(data);
    theImports.forEach((r) => {
        if (r.fromModule && r.fromModule.length > 0) {
            dependencies.push(r.fromModule)
        }
    });

    return _.uniq(dependencies);
}

let FRAMEWORKS_PATH = undefined;

function parseDependencies(fileName, sourceFile) {

    if(!FRAMEWORKS_PATH) {
        FRAMEWORKS_PATH = PATH.join(findBaseDirectory(process.cwd(), 'Frameworks'), 'Frameworks');
    }

    let dependencies = [];
    const pathName = PATH.resolve(fileName);
    let currentDir = process.cwd();
    process.chdir(PATH.dirname(pathName));

    try {

        let foundDependencies = parse(
            FS.readFileSync(pathName, 'utf8')
        );

        if (sourceFile) {
            dependencies.push(pathName);
        }

        for (let i in foundDependencies) {
            let foundFileName = foundDependencies[i],
                len = foundFileName.length;

            if (len > 0) {
                let firstChar = foundFileName[0];
                if (firstChar === '<') { //found a framework
                    let frameworkRelativePath = foundFileName.substr(1, len-2);
                    let frameworkPath = PATH.join(FRAMEWORKS_PATH, frameworkRelativePath);
                    dependencies.push.apply(
                        dependencies, parseDependencies(frameworkPath, fileName)
                    );

                } else {
                    dependencies.push.apply(dependencies, parseDependencies(foundFileName, fileName));
                }
            }
        }

    } catch (e) {
        if(e.errno === -2) {
            let dest = e.path;
            if(e.syscall === 'chdir'){
                dest = e.dest;
            }
            console.error(`ERROR in ${sourceFile}: Cannot import ${dest}, no such file or directory.`);
        }
        else {
            console.log(e);
        }
    }
    process.chdir(currentDir);
    return _.uniq(_.reverse(dependencies));
}

module.exports = function(source) {
    return parseDependencies(source, false);
};
