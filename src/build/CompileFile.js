
const compile   = require('Objective-J-Compiler/compile'),
      FS        = require('fs');


module.exports = function(sourceFileName) {

    let final = {
        code: "",
        issues: []
    };

    try {
        const source = FS.readFileSync(sourceFileName, 'utf8');
        final = Object.assign(final, compile(source, sourceFileName));
        if (final.error) {
            let err = final.error;
            console.error(`Compilation error in ${sourceFileName} at (${err.lineInfo.line}, ${err.lineInfo.column}): ${err.message}`);
        }
    }
    catch (e) {
        final.exception = e;
    }

    return final;
};