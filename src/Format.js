#!/usr/bin/env node

"use strict";

const AcornObj = require("acorn-objj");
const getopt = require("node-getopt");
const FS = require("fs");
const format = require("./formatting");

let opt = getopt.create([
  //future options
]);

opt.setHelp("Usage: oj-format {fileName}\n" + "\n" + "[[OPTIONS]]\n" + "\n");

opt.bindHelp();
opt.parseSystem();

function getAST(source) {
  let comments = [];
  const options = {
    sourceType: "module",
    onComment: comments,
  };
  try {
    let ast = AcornObj.parse.parse(source, options);
    return { nodeList: ast.body, comments: comments };
  } catch (ex) {
    console.error(ex);
  }
}

String.prototype.splice = function (offset, text, removeCount = 0) {
  let calculatedOffset = offset < 0 ? this.length + offset : offset;
  return (
    this.substring(0, calculatedOffset) +
    text +
    this.substring(calculatedOffset + removeCount)
  );
};

function mapNewLines(source) {
  let lines = source.split("\n");
  let mapping = [];
  for (let i in lines) {
    if (lines[i].trim() === "") {
      mapping.push(i);
    }
  }

  return mapping;
}

let argv = opt.argv;
let options = opt.options;

if (argv.length === 1) {
  const fileName = argv[0];
  let source = FS.readFileSync(fileName, "utf8");
  source = source.replace(/\n\s*\n\s*\n/g, "\n");
  let ast = getAST(source);
  let newLineMap = mapNewLines(source);

  if (ast && ast.nodeList) {
    let formatted = format(ast.nodeList, source);
    //insert new mapNewLines
    let lines = formatted.split("\n");
    newLineMap.forEach((newLineIdx) => {
      lines.splice(newLineIdx, 0, "\n");
    });
    let out = "";
    lines.forEach((line) => {
      out += line;
      if (line.trim() !== "") {
        out += "\n";
      }
    });
    console.log(out);
    //console.log(formatted);
    //insert comments
    // console.log(ast.comments);
    // ast.comments.forEach((comment) => {
    //   let isBlockComment = comment.type === "Block";
    //   let commentStr =
    //     (isBlockComment ? "/*" : "//") +
    //     comment.value +
    //     (isBlockComment ? "*/\n" : "");
    //   let newLineCount = commentStr.split("\n").length;
    //   formatted = formatted.splice(comment.end - commentStr.length, commentStr);
    // });
    FS.writeFileSync(fileName, out.trim() + "\n", "utf8");
  }
} else {
  console.error("Error: No file name specified.");
  process.exit(1);
}
