const { errorHandler } = require('./errorHandler');
const { validatePayload } = require('./validationMiddleware');
const upload = require('./upload');

module.exports = {
  errorHandler,
  validatePayload,
  upload,
};
