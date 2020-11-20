const router = require('express').Router();
const uploadsController = require('../../controllers/uploadsController');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

// create stream
const storage = new GridFsStorage({
  url: process.env.MONGO_CONNECTION,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// uploads route @/upload
router.post('/', upload.single('file'), (req, res) => {
  console.log('file being uploaded', req.file);
  console.log('req.body->>>>>', req.body);
});

module.exports = router;
