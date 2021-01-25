const parseImport = require('./parser');

module.exports = function parse(str) {

  //put multiline comment start/end on its own line
  str = str.replace(/\/\*/g, "\n/*");
  str = str.replace(/\*\//g, "*/\n");

  const lines = str.split('\n');
  const results = [];

  let insideComment = false;

  for (let i = 0; i < lines.length; i++) {

    const line = lines[i];

    if(isLineEndingMultilineComment(line)) {
      insideComment = false;
      continue;
    }

    if(isLineWithMultilineComment(line)) {
      insideComment = true;
      continue;
    }

    if (isLineWithComment(line) || isEmptyLine(line)) {
      continue;
    }

    if (isLineWithImport(line) && !insideComment) {
      const result = parseImport(line);
      results.push(result);
    }

  }

  return results
}

function isEmptyLine(line) {
  return line.trim() === ''
}

function isLineWithImport(line) {
  return line.trim().indexOf('@import') === 0
}



function isLineWithComment(line) {
  return line.trim().indexOf('//') === 0;
}

function isLineWithMultilineComment(line) {
  return line.trim().indexOf('/*') >= 0;
}

function isLineEndingMultilineComment(line) {
  return line.trim().indexOf('*/') >= 0;
}
