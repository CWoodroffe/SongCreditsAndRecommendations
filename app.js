'use strict'

// dotenv for hiding API keys
const config = require("dotenv").config();
const PORT = process.env.PORT;
const GENIUS_API_KEY = process.env.GENIUS_API_KEY;

// Express App (Routes)
const express = require("express");
const app     = express();
const path    = require("path");

// Minimization
const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
const portNum = process.argv[2];

//app.use('/', require('/public/search'));
//app.use('/search', require('/public/search'));

// Send index HTML at root, do not change
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/search', function(req,res){
  //res.send('Testing!');
  res.sendFile(path.join(__dirname + '/public/search.html'));
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
  //res.sendFile(path.join(__dirname + 'public/index.js'));
});


// Send Genius API key provided through RapidAPI
app.get('/GeniusKey', function(req, res){
  res.send(
    {
      key: GENIUS_API_KEY
    }
  )

  /*
  fs.readFile('GeniusKey.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('test - ' + err);
      return;
    }

    console.log(data);
    res.send(
      {
        key: data
      }
    )
  });
  */
});

app.listen(portNum);
console.log('Running app at localhost: ' + portNum);
