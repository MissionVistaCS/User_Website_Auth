var express = require("express");
var server = express();
var fs = require("fs");

server.use(express.static(__dirname + "/"));

//request is info sending to server from client.
//response is info sending to client from server.
server.get("/",function(request,response){
	response.sendFile(__dirname + "/index.html");
});

var port = process.env.PORT || 9000;
server.listen(port);
console.log('Magic happens on port:', port);
