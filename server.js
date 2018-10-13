const staticServer = require('node-static');

const file = new staticServer.Server('./build');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(8080);

console.log('ROAD FIGHTER serving on: http://localhost:8080');