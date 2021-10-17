// installer multer npm install --save multer
const multer = require('multer');
const fs = require('fs');
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// création du dossier images s'il n'existe pas 
fs.mkdir("./images", function(image) {
  if(!image || (image && image.code === 'EEXIST')){
    console.log("Dossier déjà existant!")
  } else {
    console.log("Votre dossier à bien été crée.")
  }
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');