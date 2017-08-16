

const fs = require('fs');
//read the json file

module.exports = {
readJSON : function(fileName){
fs.readFile(fileName,(err,data) => {
if(err){
	throw err;
}
console.log(JSON.parse(data));
});
}
};
