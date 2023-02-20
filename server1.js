var http = require('http');  //module for the communication
http.createServer(function (request, response) {
  response.writeHead(200);
  response.write('<h1>Hello Node Safwan!!!!</h1>\n');
  response.end();
}).listen(3000);
console.log('Server running at http://localhost:3000');

// Save the file as server1.js
//Start the server with: node server1.js
