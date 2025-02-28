const express = require('express');
const { default: rateLimit } = require('express-rate-limit');

const { logRequestMiddleware, errorHandler } = require('./middleware');
const { configureRouter } = require('./router');
const connectDB = require('./db');
const config = require('./config');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const port = config.PORT;

const app = express();

app.use(limiter);

connectDB();

app.use(express.json());

app.use(logRequestMiddleware);

configureRouter(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
