var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({    
  extended: true
}));

var server = app.listen(3000,  "localhost", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port);
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require("./app/routes/persona.routes")(app);
