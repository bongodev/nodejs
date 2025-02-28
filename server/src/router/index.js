const productRouter = require('./productRouter');
const userRouter = require('./userRouter');

const configureRouter = (app) => {
  app.get('/status', (req, res) => {
    res.send('OK');
  });

  app.use('/api/products', productRouter);
  app.use('/api/users', userRouter);
};

module.exports = { configureRouter };
