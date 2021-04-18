const PATH = require("path"),
    OS = require("os"),
    FS = require("fs");

("use strict");

const ROOT_FOLDER =
    "win32" === OS.platform() ? process.cwd().split(PATH.sep)[0] : "/";

/**
 * Returns all the directories and files in path source
 * @param source
 * @returns {string[]} list of directories and files
 */
function ls(source) {
    let currentDir = process.cwd();
    process.chdir(PATH.dirname(source));
    let dirLst = FS.readdirSync(source);
    process.chdir(currentDir);
    return dirLst;
}

/**
 * Finds the first occurrence of baseName in the parent folder hierarchy
 * @param source
 * @param baseName
 * @returns {string|*} first parent directory containing baseName
 */
function getBaseDirectoryPath(source, baseName) {
    let sourcePathDir = source;
    if (!PATH.isAbsolute(sourcePathDir)) {
        sourcePathDir = PATH.dirname(PATH.resolve(source));
    }

    if (sourcePathDir === ROOT_FOLDER) {
        console.error(`ERROR: Unable to find "${baseName}" in project`);
        process.exit(1);
    }

    let lst = ls(sourcePathDir);
    if (lst.indexOf(baseName) < 0) {
        return getBaseDirectoryPath(PATH.join(sourcePathDir, "../"), baseName);
    }

    return sourcePathDir;
}

module.exports = getBaseDirectoryPath;
