/**
 * Created by Andrius on 28/01/16.
 */
const fs = require('fs');
exports.get = function(req,res){
  //load index html
  fs.readFile('./views/index.html', function (err, html) {
    if (err) {
      throw err;
    }
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
  });
};
exports.post = function(req,res){

};
exports.put = function(req,res){

};
exports.delete = function(req,res){

};