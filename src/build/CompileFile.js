const compile = require("Objective-J-Compiler/compile"),
    FS = require("fs");

module.exports = function (sourceFileName) {
    let final = {
        code: "",
        issues: [],
    };

    try {
        const source = FS.readFileSync(sourceFileName, "utf8");
        final = Object.assign(final, compile(source, sourceFileName));
    } catch (e) {
        final.exception = e;
    }

    return final;
};
