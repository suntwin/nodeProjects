const fs = require('fs');
const Promise = require('promise');
var readFile = Promise.denodeify(require('fs').readFile);
// now `readFile` will return a promise rather than
// expecting a callback
//read the json file
module.exports = {
readJSON : function(filename,callback){
var promise =  new Promise(function(resolve,reject){
   fs.readFile(filename, function(err, data){
            if (err) 
                reject(err); 
            else 
                resolve(data);
        });

  });
 promise.then((result) => {
 	console.log(JSON.parse(result));
 });
 
 return promise;

}
};