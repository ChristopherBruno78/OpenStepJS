#!/usr/bin/env node
"use strict"

const FS                    = require('fs');
const express               = require('express');
const build                 = require('./build/Build');

function generateScriptLinks(theFiles) {
    let out = "";
    theFiles.forEach((filePath) => {
        filePath = "/"+filePath;
        out += `<script type='text/javascript' src=${filePath}></script>\n`;
    });
    return out;
}

express.static.mime.define({'text/javascript': ['js', 'oj']});

const app = express();
app.use("/build", express.static("build"));

app.get('/', (req, res) => {

    let theFiles = build();
    let scriptsStr = generateScriptLinks(theFiles);
    let html = FS.readFileSync("index.html", 'utf8');

    let idx = html.indexOf("</body>");
    let finalHtml = html.substr(0, idx)
                + "<script type='text/javascript' src='/build/Objective-J.js'></script>\n"
                + scriptsStr
                + "<script type='text/javascript'>\n"
                + "window.addEventListener('load', window.main || null)\n"
                + "</script> "
                + "</body>";

    res.writeHead(200, {
        "Content-Type" : "text/html"
    });
    res.write(finalHtml);
    res.end();
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
