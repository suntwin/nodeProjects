

// create a function that creates a file on the file system inside the folder
//C:\\pythonProjects\\imacro\\test1\\Output"

const filesystem = require('fs');
const Promise = require("bluebird");
const config = require('./config1.json');
const util = require('./myutility.js');
let write_fs = {};
Promise.promisifyAll(filesystem);

module.exports = {
create_new_file: function()
{


var path = config.OUTPUT_FOLDER + '\\text.txt';
var options = {
 flags: 'w',
 defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
};
if(util.isEmpty(write_fs)){
write_fs = filesystem.createWriteStream(path,options);
console.log('write steam is'+write_fs);
}

},

write_to_file: function(text)
{
if(!util.isEmpty(write_fs)) {
	// write_fs is not empty, so write the incoming text to the file
	Promise.promisifyAll(write_fs);
	write_fs.write(text,function(err,response){
		if(!err){
			console.log(`response after write ${response}`);
		}
	});
}
}
};
