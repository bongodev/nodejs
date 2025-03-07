const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./config/logger');

const connectDB = async () => {
  logger.info('Connecting mongodb...');
  try {
    await mongoose.connect(config.db.MONGO_URI, {
      dbName: config.db.MONGO_DB_NAME,
    });

    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error(`MongoDB connection failed!! ${error}`);
  }
};

module.exports = connectDB;
