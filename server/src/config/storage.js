const multer = require('multer');
const path = require('path');
const fs = require('fs');

const logger = require('./logger');

const config = require('.');

const uploadDir = path.join(
  __dirname,
  `../../${config.FILE_SERVER.UPLOAD_DIR}`,
);

if (!fs.existsSync(uploadDir)) {
  logger.warn('Upload directory does exists!');
  try {
    logger.info('Creating upload directory...');
    fs.mkdirSync(uploadDir, { recursive: true });
    logger.info('Upload directory created successfully');
  } catch (error) {
    logger.error('Failed to create upload dir', error);
  }
} else {
  logger.info('Upload directory already exists');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), 'false');
  }
}

module.exports = {
  storage,
  fileFilter,
};
