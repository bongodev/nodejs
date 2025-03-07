const { errorHandler } = require('./errorHandler');
const { validatePayload } = require('./validationMiddleware');

module.exports = {
  errorHandler,
  validatePayload,
};
