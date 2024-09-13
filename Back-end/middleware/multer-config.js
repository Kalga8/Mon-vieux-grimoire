const multer = require('multer');
const sharp = require('sharp');
path = require('path');
fs = require('fs');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, 'images');
    },

    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      callback(null, name + Date.now() + '.webp');
    }
});

const upload = multer({ storage: storage}).single('image');

const optimize = (req, res, next) => {
  if (req.file) {
      const filePath = req.file.path;
      const output = path.join('images', `opt_${req.file.filename}`);
      sharp(filePath)
          .resize({ width: null, height: 568 })
          .webp()
          .toFile(output)
          .then(() => {
              //delete older file, keep the resized one
              fs.unlink(filePath, () => {
                  req.file.path = output;
                  next();
              })
          })
          .catch(err => next(err));
  } else {
      return next();
  }
};

exports.upload = upload;
exports.optimize = optimize;

module.exports = multer({ storage: storage }).single('image');