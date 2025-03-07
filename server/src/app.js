const cors = require('cors');
const express = require('express');
const pinoHttp = require('pino-http');

const { errorHandler } = require('./middleware');
const { configureRouter } = require('./router');
const connectDB = require('./db');
const config = require('./config');
const limiter = require('./config/ratelimit');
const logger = require('./config/logger');

const port = config.PORT;

const app = express();

app.use(pinoHttp({ logger }));

app.use(cors(config.CORS));

app.use(limiter);

connectDB();

app.use(express.json());

configureRouter(app);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
