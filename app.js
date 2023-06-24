'use strict'

// Express App (Routes)
const express = require("express");
const app     = express();
const path    = require("path");

// Minimization
const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
const portNum = process.argv[2];

// Send HTML at root, do not change
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Send Style, do not change
app.get('/style.css',function(req,res){
  res.sendFile(path.join(__dirname+'/public/style.css'));
});

// Send obfuscated JS, do not change
app.get('/index.js',function(req,res){
  fs.readFile(path.join(__dirname+'/public/index.js'), 'utf8', function(err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, {compact: true, controlFlowFlattening: true});
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

// Send Genius API key provided through RapidAPI
app.get('/GeniusKey', function(req, res){
  fs.readFile('GeniusKey.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(data);
    res.send(
      {
        key: data
      }
    )
  });
})

app.listen(portNum);
console.log('Running app at localhost: ' + portNum);
