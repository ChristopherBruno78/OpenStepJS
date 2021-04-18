"use strict";

const FS = require("fs"),
    PATH = require("path");

const fsExtra = require("fs-extra");
const Uglify = require("uglify-js");

const findBaseDirectory = require("./FindBaseDirectory");

const compileFile = require("./CompileFile");

const HOME_DIR = findBaseDirectory(process.cwd(), "package.json");
const BUILD_DIR = PATH.join(HOME_DIR, "build");
const PKG_LOC = PATH.join(HOME_DIR, "package.json");

function getObjectPathName(sourcePath) {
    return PATH.join(BUILD_DIR, getObjectFileName(sourcePath));
}

function getObjectCodePathName(sourcePath) {
    return PATH.join(BUILD_DIR, getObjectCodeFileName(sourcePath));
}

function getObjectCodeFileName(sourcePath) {
    let baseName = PATH.basename(sourcePath);
    let idx = baseName.indexOf(".j");
    return baseName.substr(0, idx) + ".code.js";
}

function getObjectFileName(sourcePath) {
    let baseName = PATH.basename(sourcePath);
    let idx = baseName.indexOf(".j");
    return baseName.substr(0, idx) + ".oj";
}

/**
 * Returns if a source Objective-J file needs to be compiled
 * @param sourcePath
 * @returns {boolean}
 */

function isCompilationNeeded(sourcePath) {
    if (!FS.existsSync(sourcePath)) {
        return false;
    }

    let objectPath = getObjectPathName(sourcePath);
    if (!FS.existsSync(objectPath)) {
        return true;
    }

    //compare file timestamps;
    let sourceStat = FS.statSync(sourcePath),
        objectStat = FS.statSync(objectPath);

    return sourceStat.mtimeMs >= objectStat.mtimeMs;
}

function compileIfNeeded(sourcePath) {
    let relativeSourcePath = PATH.relative(process.cwd(), sourcePath);
    let out = {
        LOG: [],
        sourceFile: relativeSourcePath,
    };

    if (!FS.existsSync(sourcePath)) {
        out.LOG.push({
            severity: "error",
            message: `No such file ${relativeSourcePath}`,
            sourceFile: relativeSourcePath,
        });
        return out;
    }

    out.objectFile = PATH.relative(process.cwd(), getObjectPathName(sourcePath));

    if (!isCompilationNeeded(sourcePath)) {
        //read the current object file
        if (FS.existsSync(out.objectFile)) {
            return JSON.parse(FS.readFileSync(out.objectFile, "utf8"));
        }
        return out;
    }

    console.log(`Compiling "${relativeSourcePath}"`);

    let compilationObj = compileFile(sourcePath);
    if (compilationObj.error) {
        let err = compilationObj.error;
        out.LOG.push({
            severity: "error",
            message: `Parsing error in ${relativeSourcePath} at (${err.lineInfo.line}, ${err.lineInfo.column}): ${err.message}`,
            sourceFile: relativeSourcePath,
        });
        out.error = true;
        console.error(`Error found in ${relativeSourcePath}: could not compile.`);
        return out;
    }

    if (compilationObj.exception) {
        out.LOG.push({
            severity: "error",
            message: compilationObj.exception.message,
            sourceFile: relativeSourcePath,
        });
        out.error = true;
        return out;
    }

    compilationObj.issues.forEach((issue) => {
        let severity = issue.severity.toUpperCase();
        let sourceFile = PATH.relative(process.cwd(), issue.file);
        let lineInfo = issue.lineInfo;
        out.LOG.push({
            severity: severity,
            message: `${issue.message} in ${sourceFile} at (${lineInfo.line},${lineInfo.column})`,
            sourceFile: sourceFile,
        });
        if (severity === "error") {
            out.error = true;
        }
    });

    //create the oj file
    out.code = compilationObj.code;
    out.superclassRefs = compilationObj.superclassRefs;
    out.classDefs = Object.keys(compilationObj.classDefs);
    out.dependencies = compilationObj.dependencies;
    FS.writeFileSync(out.objectFile, JSON.stringify(out), "utf8");
    //write the code
    FS.writeFileSync(getObjectCodePathName(sourcePath), out.code, "utf8");
    return out;
}

const FRAMEWORKS_PATH = PATH.join(
    findBaseDirectory(process.cwd(), "Frameworks"),
    "Frameworks"
);

function compileWithDependencies(sourcePath, compilationLog, parentPath) {
    let relPath = PATH.relative(process.cwd(), sourcePath);
    let sourceFiles = compilationLog.sourceFiles;

    for (const i in sourceFiles) {
        if (sourceFiles[i] === relPath) {
            return compilationLog;
        }
    }
    let out = compileIfNeeded(sourcePath, compilationLog.buildDir);
    if (!out.error) {
        if (parentPath) {
            let pIndex = compilationLog.sourceFiles.indexOf(parentPath);
            compilationLog.sourceFiles.splice(pIndex, 0, out.sourceFile);
            compilationLog.objectFiles.splice(pIndex, 0, out.objectFile);
        } else {
            compilationLog.sourceFiles.push(out.sourceFile);
            compilationLog.objectFiles.push(out.objectFile);
        }
    }
    compilationLog.LOG.push.apply(compilationLog.LOG, out.LOG);
    if (out.dependencies) {
        out.dependencies.forEach((relFilePath) => {
            let len = relFilePath.length,
                importPath = null;
            if (len > 0) {
                let firstChar = relFilePath[0];
                if (firstChar === "<") {
                    //found a framework
                    let frameworkRelativePath = relFilePath.substr(1, len - 2);
                    importPath = PATH.join(FRAMEWORKS_PATH, frameworkRelativePath);
                } else {
                    importPath = PATH.resolve(
                        PATH.join(PATH.dirname(sourcePath), relFilePath)
                    );
                }

                if (FS.existsSync(importPath)) {
                    compileWithDependencies(importPath, compilationLog, relPath);
                } else {
                    console.error(
                        `Error: In file "${sourcePath}", attempting to import file "${importPath}" which does not exist.`
                    );
                }
            }
        });
    }

    return compilationLog;
}

let make = function (mainFile) {
    const SRC_DIR = PATH.join(HOME_DIR, "src");
    let MAIN_FILE = mainFile;

    if (!MAIN_FILE) {
        //read package json to find main file
        const pkgJSON = require(PKG_LOC);
        if (!pkgJSON.main) {
            result.error = "No main file defined in package.json";
            return result;
        }

        MAIN_FILE = PATH.join(SRC_DIR, pkgJSON.main);
    }

    let result = {
        code: "",
        objectFiles: [],
        sourceFiles: [],
        classDefs: [],
    };

    if (!FS.existsSync(MAIN_FILE)) {
        result.error = `No such main file: ${MAIN_FILE}`;
        return result;
    }

    result.LOG = [];
    FS.mkdirSync(BUILD_DIR, {recursive: true});

    Object.assign(
        result,
        compileWithDependencies(MAIN_FILE, {
            sourceFiles: [],
            objectFiles: [],
            LOG: [],
        })
    );

    result.objectFiles.forEach((relPath) => {
        try {
            let obj = JSON.parse(FS.readFileSync(relPath, "utf8"));
            //check for any unimplemented superclasses
            if (obj.superclassRefs) {
                obj.superclassRefs.forEach((ref) => {
                    if (ref.superclass) {
                        if (result.classDefs.indexOf(ref.superclass) < 0) {
                            result.LOG.push({
                                severity: "error",
                                message: `cannot find implementation declaration for "${ref.superclass}", superclass of "${ref.class}" in "${obj.sourceFile}"`,
                                sourceFile: obj.sourceFile,
                            });
                        }
                    }
                });
            }
            result.classDefs.push.apply(result.classDefs, obj.classDefs);
            result.code += obj.code;
        } catch (e) {
            console.error(e);
        }
    });

    return result;
};

let build = function (outFileName, minify) {
    let result = make();
    let LOG = result.LOG;

    LOG.forEach((issue) => {
        let severity = issue.severity.toUpperCase();
        if (issue.severity === "error") {
            console.error(`${severity}: ${issue.message}`);
            process.exit(1);
        } else {
            console.warn(`${severity}: ${issue.message}`);
        }
    });

    if (outFileName) {
        //remove artifacts
        let outCode = result.code;
        if (minify) {
            outCode = Uglify.minify(outCode).code;
        }
        FS.writeFileSync(PATH.join(BUILD_DIR, outFileName), outCode, "utf8");
    }
};

let clean = function () {
    fsExtra.removeSync(BUILD_DIR);
};

module.exports.make = make;
module.exports.build = build;
module.exports.clean = clean;
