const multer = require('multer');
const { storage, fileFilter } = require('../config/storage');

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter,
});

module.exports = upload;
