"use strict"

const FS                    = require('fs'),
    PATH                    = require('path');

const Uglify                = require('uglify-js');

const parseDependencies     = require('./ParseDependencies');
const findBaseDirectory     = require('./FindBaseDirectory');

const compileFile = require('./CompileFile');

const HOME_DIR = findBaseDirectory(process.cwd(), "package.json");
const BUILD_DIR = PATH.join(HOME_DIR, "build");
const PKG_LOC = PATH.join(HOME_DIR, "package.json");


function getObjectPathName(sourcePath) {
    return PATH.join(BUILD_DIR,
        getObjectFileName(sourcePath)
    );
}

function getObjectCodePathName(sourcePath) {
    return PATH.join(BUILD_DIR,
        getObjectCodeFileName(sourcePath)
    );
}


function getObjectCodeFileName(sourcePath) {
    let baseName = PATH.basename(sourcePath);
    let idx = baseName.indexOf('.');
    return baseName.substr(0, idx) +".code.js";
}


function getObjectFileName(sourcePath) {
    let baseName = PATH.basename(sourcePath);
    let idx = baseName.indexOf('.');
    return baseName.substr(0, idx) +".oj";
}

/**
 * Returns if a source Objective-J file needs to be compiled
 * @param sourcePath
 * @returns {boolean}
 */

function isCompilationNeeded(sourcePath) {

    if(!FS.existsSync(sourcePath)){
        return false;
    }

    let objectPath = getObjectPathName(sourcePath);
    if(!FS.existsSync(objectPath)) {
        return true;
    }

    //compare file timestamps;
    let sourceStat = FS.statSync(sourcePath),
        objectStat = FS.statSync(objectPath);

    return sourceStat.mtimeMs >= objectStat.mtimeMs
}

function compileIfNeeded(sourcePath) {

    let relativeSourcePath = PATH.relative(process.cwd(), sourcePath);

    let out = {
        LOG: [],
        sourceFile : relativeSourcePath
    };

    if(!FS.existsSync(sourcePath)) {
        out.LOG.push({
            severity : "error",
            message  : `No such file ${relativeSourcePath}`,
            sourceFile : relativeSourcePath
        })
        return out;
    }

    out.objectFile = PATH.relative(process.cwd(), getObjectPathName(sourcePath));

    if(!isCompilationNeeded(sourcePath)) {
        //read the current object file
        if(FS.existsSync(out.objectFile)) {
            return JSON.parse(
                FS.readFileSync(out.objectFile, 'utf8')
            );
        }
        return out;
    }

    console.log(`Compiling ${relativeSourcePath}`)

    let compilationObj = compileFile(sourcePath);
    if(compilationObj.error) {
        let err = compilationObj.error;
        out.LOG.push({
            severity : "error",
            message: `Compilation error in ${relativeSourcePath} at (${err.lineInfo.line}, ${err.lineInfo.column}): ${err.message}`,
            sourceFile: relativeSourcePath
        })
        return out;
    }

    if(compilationObj.exception) {
        out.LOG.push({
            severity: "error",
            message: compilationObj.exception.message,
            sourceFile : relativeSourcePath
        });
        return out;
    }

    compilationObj.issues.forEach((issue) => {
        let severity = issue.severity.toUpperCase();
        let sourceFile = PATH.relative(process.cwd(), issue.file);
        let lineInfo = issue.lineInfo;
        out.LOG.push({
            severity : severity,
            message : `${issue.message} in ${sourceFile} at (${lineInfo.line},${lineInfo.column})`,
            sourceFile : sourceFile
        });
    });

    //create the oj file
    out.code = compilationObj.code;
    FS.writeFileSync(out.objectFile,
        JSON.stringify(out)
        , 'utf8');
    //write the code
    FS.writeFileSync(getObjectCodePathName(sourcePath),
            out.code,
            "utf8"
    );

    return out;
}


module.exports.make = function () {

    let result = {
        success: true,
        code: "",
        objectFiles : [],
        sourceFiles : []
    };
    //read package json to find main file
    const pkgJSON = require(PKG_LOC);
    if(!pkgJSON.main) {
        result.error = ("No main file defined in package.json");
        return result;
    }

    const SRC_DIR = PATH.join(HOME_DIR, 'src');
    const MAIN_FILE_PATH = PATH.join(SRC_DIR, pkgJSON.main);

    if(!FS.existsSync(MAIN_FILE_PATH)) {
        result.error = (`No such main file: ${MAIN_FILE_PATH}`);
        return result;
    }

    result.LOG = [];
    FS.mkdirSync(BUILD_DIR, {recursive: true});

    //gather dependencies
    let dependencyFiles = parseDependencies(MAIN_FILE_PATH);

    console.log(dependencyFiles);

    dependencyFiles.unshift(MAIN_FILE_PATH);

    let count = dependencyFiles.length,
        i = count - 1;

    for(; i >= 0; i--) {
        let theFilePath = dependencyFiles[i];
        let out = compileIfNeeded(theFilePath);
        result.sourceFiles.push(out.sourceFile);
        result.objectFiles.push(out.objectFile);
        result.code += (out.code || "");
        result.LOG.push.apply(result.LOG, out.LOG);
    }

    //copy the Objective-J runtime


    return result;
}

