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

function checkFile(filePath, sourcePath, visited) {

    if(FS.existsSync(filePath)) {
        if(visited.indexOf(filePath) < 0) {
            return null;
        }
        else {
            return {
                    severity: "warning",
                    message: `Circular import found in file "${sourcePath}"`,
                    sourceFile: PATH.relative(process.cwd(), sourcePath)
                };
        }
    }
    else {
       return {
            severity: "warning",
            message: `Invalid import "${filePath}" found in "${sourcePath}" - no such file or directory.`,
            sourceFile: PATH.relative(process.cwd(), sourcePath)
        };
    }
}

function parseDependencies(fileName, visited, sourceFile) {

    let issues = [];
    const pathName = PATH.resolve(fileName);

    visited.push(pathName);

    let dependencies = [];
    let currentDir = process.cwd();
    process.chdir(PATH.dirname(pathName));

    let foundDependencies = parse(
        FS.readFileSync(pathName, 'utf8')
    );

    for (let i in foundDependencies) {
        let foundFileName = foundDependencies[i],
            len = foundFileName.length,
            importPath = null;
        if (len > 0) {
            let firstChar = foundFileName[0];
            if (firstChar === '<') { //found a framework
                let frameworkRelativePath = foundFileName.substr(1, len-2);
                importPath = PATH.join(FRAMEWORKS_PATH, frameworkRelativePath);
            } else {
                importPath = foundFileName;
            }

            let importIssue = checkFile(importPath, pathName, visited);
            if(importIssue) {
                issues.push(importIssue)
            }
            else {
                dependencies.push.apply(dependencies,
                    parseDependencies(importPath, visited, fileName)
                );
            }
        }
    }

    dependencies.push({
        path: pathName,
        issues: issues
    });

    process.chdir(currentDir);
    return dependencies;
}

module.exports = function(source) {
    FRAMEWORKS_PATH = PATH.join(findBaseDirectory(process.cwd(), 'Frameworks'), 'Frameworks');
    return parseDependencies(source, [])
};
