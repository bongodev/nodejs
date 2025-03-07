const pino = require('pino');

const transport = pino.transport({
  options: {
    colorize: true,
    singleLine: true,
  },
  target: 'pino-pretty',
});

const logger = pino(
  {
    level: 'info',
    redact: ['req.headers.authorization', 'user.password', 'user.phoneNumber'],
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);

module.exports = logger;
