const vision = require('@google-cloud/vision');
 
// Creates a client
const client = new vision.ImageAnnotatorClient();
 
// Performs label detection on the image file
client
  .labelDetection('/home/local/JMANDIGITAL/vijay/workspace/Backup_system/Pictures/resgin.jpeg')
  .then(results => {
    const labels = results[0].labelAnnotations;
 
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });