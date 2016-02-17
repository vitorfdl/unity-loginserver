"use strict";
var app        = require('express')();
var bodyParser = require('body-parser');
var http       = require('http');
let lib        = require("./libs/");

//Set Configurations
var server = http.Server(app);
app.set('port', 8080);
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ "extended": true }));
app.use(bodyParser.json());

app.post('/create', function(req, res) {
  let model = req.body || {};
  lib.account.create(model, function (error) {
      if (error) {
          return res.status(500).send(error);
      }
      res.send("Succesfull");
  });
});

app.post('/login', function(req, res) {
    let model = req.body || {};
    lib.account.login(model, function (error) {
        if (error) {
            return res.status(500).send(error);
        }
         res.send("Succesfull");
    });
});

server.listen(8080, function () {
    console.log(`[${process.pid}] Webserver on port = 8080`);
});
