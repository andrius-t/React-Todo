/**
 * Created by Andrius on 28/01/16.
 */
"use strict";
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
//use nodeGlob to load controllers? slower
function route(req,res) {

  req.parsedUrl = url.parse(req.url, true);
  //receive data
  var body = '';
  req.on('data', function (data) {
    body += data;

    if (body.length > 1e6)
      req.connection.destroy();
  });
  //on end receiving
  req.on('end', function () {
    req.body = qs.parse(body);
    //find css files
    if (/.(css)$/.test(req.parsedUrl.pathname)) {

      fs.readFile(__dirname + "/views/" +  req.parsedUrl.pathname, 'utf8', function (err, data) {
        if (err){
          notfound(res);
        }else {
          loadData(res,data,'text/css');
        }
      });

      //find js files
    } else if (/.(js)$/.test(req.parsedUrl.pathname)) {

      fs.readFile(__dirname + "/views/" + req.parsedUrl.pathname, 'utf8', function (err, data) {
        if (err) {
          notfound(res);
        }else {
          loadData(res,data,'text/js');
        }
      });

      //find controller
    } else {
      if (req.parsedUrl.pathname === '/') {
        require('./controllers/index')[req.method.toLocaleLowerCase()](req, res);
      } else if (req.parsedUrl.pathname === '/data') {
        require('./controllers/data')[req.method.toLocaleLowerCase()](req, res);
      } else {
        notfound(res);
      }
    }
  });


}
//not found page
function notfound(res){
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("404 Not found");
  res.end();
}
//load css or js data
function loadData(res,data,type){
  res.writeHead(200, {'Content-Type': type});
  res.write(data, 'utf8');
  res.end();
}
exports.route = route;





