/**
 * Created by Andrius on 28/01/16.
 */

var http = require('http');
var router = require('./router.js');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {
  router.route(req,res);

}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});