require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  db: {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB,
  },
};

module.exports = config;
