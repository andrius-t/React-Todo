/**
 * Created by Andrius on 28/01/16.
 */
"use strict";
const fs = require('fs');



exports.get = function(req,res){
  //send json file send callback function
  readJson( function(data) {
    res.writeHeader(200, {"Content-Type": "text/json"});
    res.write(data);
    res.end();
  });
};
exports.post = function(req,res){
  //load json file send callback function
  readJson( function(data) {
    //add new element to array
    var newdata = JSON.parse(data);
    req.body.id = Date.now();
    req.body.complete = false;
    newdata.push(req.body);

    fs.writeFile("./data/data.json", JSON.stringify(newdata), "utf8", function () {
      res.writeHeader(200, {"Content-Type": "text/json"});
      res.write(JSON.stringify(newdata));
      res.end();
    });
  });
};
exports.put = function(req,res){
  //load json file send callback function
  readJson( function(data) {
    //update element in array
    var newdata = JSON.parse(data);
    for(let i = 0;i<newdata.length; i++){
      if(req.body.id == newdata[i].id){
        if(newdata[i].complete == true){
          newdata[i].complete = false;
        }else{
          newdata[i].complete = true;
        }
      }
    }

    fs.writeFile("./data/data.json", JSON.stringify(newdata), "utf8", function () {
      res.writeHeader(200, {"Content-Type": "text/json"});
      res.write(JSON.stringify(newdata));
      res.end();
    });
  });
};
exports.delete = function(req,res){

  readJson( function(data) {
    //remove element from array
    var newdata = JSON.parse(data);
    for(let i = 0;i<newdata.length; i++){
      if(req.body.id == newdata[i].id){
        newdata.splice(i, 1);
      }
    }

    fs.writeFile("./data/data.json", JSON.stringify(newdata), "utf8", function () {
      res.writeHeader(200, {"Content-Type": "text/json"});
      res.write(JSON.stringify(newdata));
      res.end();
    });
  });
};

//load json file
function readJson(func){
  fs.readFile('./data/data.json', function (err, data) {
    if (err) {
      throw err;
    }
    func(data);
  });
};
