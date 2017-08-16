 

var google = require('googleapis');

const file = require('./fileops.js');
const config = require('./config.json');


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



var bucketpromise = gcs.getBuckets();
bucketpromise.then(
   data => {
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
        

var bucketfilespromise = bucket_obj.getFiles();
bucketfilespromise.then(
  data => {
    var files = data[0];
    console.log('files are' + files);
    for(i=0;i<files.length;i++){
    
      file_name = files[i].id;
      let bucket_name = config.IMAGE_BUCKET;
      imageurl = `gs://${bucket_name}/${file_name}`;
      var image = { source: { imageUri: imageurl } };
     
      var visionpromise = vision.textDetection(image);
      visionpromise.then(
        response => {
          const {fullTextAnnotation} = response[0];
          let {text} = fullTextAnnotation;
           text = `${file_name}${text}
                   ${file_name}
                   \n
                   \n`;
          debugger;
          if(util.isEmpty(file.write_fs))
          {
            
            file.create_new_file();
            }
          file.write_to_file(text);
        },
        error => {
          console.error(error);
        }).catch(function(e){
          console.log(e);
        })
    }
    
  },
  error => {
        console.log(error);
  });


      }
    
},  
error =>{
  console.log('error');
});
  