const validatePayload = (schema) => {
  return (req, res, next) => {
    const payload = req.body;
    schema.parse(payload);
    next();
  };
};

module.exports = {
  validatePayload,
};
