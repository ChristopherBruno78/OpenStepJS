#!/usr/bin/env node

"use strict"

const FS                    = require('fs');
const PATH                  = require('path');
const { execSync }          = require('child_process');
const getopt                = require('node-getopt');

function copyFramework(projectName, frameworkName) {
    execSync("cp -r " +
        PATH.join(__dirname, `../Frameworks/${frameworkName}`)  +
        " " +
        PATH.join(projectName, `Frameworks/${frameworkName}`)
    );
}


function createProject(projectName) {

    let pkgJSON = {
        name : projectName,
        main : "main.j",
        scripts: {
            build : "oj-make"
        }
    }
    //write package.json
    FS.writeFileSync(PATH.join(projectName, "package.json"),
        JSON.stringify(pkgJSON, null, 2),
            "utf8"
    );

    FS.mkdirSync(PATH.join(projectName, "src"));

    //write index.html
    FS.writeFileSync(PATH.join(projectName, "index.html"),
            FS.readFileSync(
                PATH.join(__dirname, "templates/index.html"),
                "utf8"
            ),
            "utf8"
    );

    //write main.j
    FS.writeFileSync(PATH.join(projectName, "src/main.j"),
              FS.readFileSync(
                  PATH.join(__dirname, "templates/main.j"),
                  "utf8"
              ),
             "utf8"
    );

    FS.mkdirSync(PATH.join(projectName, "Frameworks"));

    //copy the Foundation framework
    copyFramework(projectName, "Foundation");
    //copy the Objective-J Runtime
    copyFramework(projectName, "Objective-J");

}

let opt = getopt.create([
    //future options
]);

opt.setHelp(
    "Usage: oj-create {projectName}\n" +
    "\n" +
    "[[OPTIONS]]\n" +
    "\n"
);

opt.bindHelp();
opt.parseSystem();

let argv = opt.argv;
let options = opt.options;

if(argv.length === 1) {
    const projectName = argv[0];
    try {
        FS.mkdirSync(projectName);
        console.log("Creating OpenStep-JS project...");
        createProject(projectName);
    }catch (e) {
        console.log(e);
        console.error(`Error: Folder with name "${projectName}" already exists.`);
        process.exit(1);
    }
}
else {
    console.error("Error: No project name specified.");
    process.exit(1);
}