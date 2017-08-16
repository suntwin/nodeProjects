 

var google = require('googleapis');

const file = require('./fileops.js');

var compute = google.compute('v1');
const util = require('./myutility.js');
 
var gcs = require('@google-cloud/storage')({
   projectId: 'ocraws-176100',
   keyFilename: 'ocraws-3061a24767c9.json'
});

var vision = require('@google-cloud/vision')({
   projectId: 'ocraws-176100',
   keyFilename: 'ocraws-3061a24767c9.json'
});


// here is the promise version, below getBuckets since call back is missing in the brackets
// will return a promise object and hence it must have a thenable function which we are calling
let bucket_obj = {};
let file_name = '';
gcs.getBuckets().then((data) => {
    let img_bucket = 'nitesh_test12';
    console.log('data is'+data);
  var buckets = data[0];
  
        for (i = 0; i < data[0].length; i++) {
       if (img_bucket === data[0][i].id)
       {
         bucket_obj = data[0][i];
         continue;
       }
     
}
if (JSON.stringify(bucket_obj) !== '{}') {
        console.log('found image bucket');
        
// here we are going to process the bucket obj and display all the files       
bucket_obj.getFiles().then(function(data) {
  var files = data[0];
  console.log('files are' + files);
//get the first file name
//file_name = files[0].id;

for (i=0;i<files.length;i++)
{

file_name = files[i].id;
console.log("processing file"+file_name);
//imageurl = 'https://storage.cloud.google.com/nitesh_test12/'+file_name;
imageurl = `gs://nitesh_test12/${file_name}`;
// now we have the bucket object and the file name, lets call the vision api now
var image = {
  source: {
    imageUri: imageurl
            }
            };

vision.textDetection(image).then(response => {
 //descttucture fulltextannotation out of response[0] object
 const {fullTextAnnotation} = response[0];
  //descttucture text out of fullTextAnnotation object
 let {text} = fullTextAnnotation;
 text = `${file_name}${text}
         ${file_name}
        \n
        \n`;
  console.log('we got a response for image' + text);
  if(util.isEmpty(file.write_fs))
  {
  file.create_new_file();
   }
  file.write_to_file(text);
}).catch(err => {   //then able ends here
  console.error(err);
});                 //catch ends here

} // for loop ends here




   

});// bucket get files ends here

} //if ends here
}); //get bucket ends here


console.log('reacched here');

// once you have above, then you need all the files in the bucket


