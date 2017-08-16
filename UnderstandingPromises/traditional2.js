var file1 = require('./WithPromise.js');
//var file1 = require('./traditional.js');
file1.readJSON("name.txt",((data) => {
	console.log(data);
}));