const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('../config/config');
mongoose.set('runValidators', true);

const dbConUrl = `${config.dbUrl}/${config.dbName}`;

module.exports.connect = function connect() {
    let reconnectTimeout = 0;
    let retryCount = 0;
    const connectDB = function () {
        const reconnectAfterInterval = 3000;
        const maxNoOfRetries = 100;
        logger.info('Connecting to MongoDB...');
        return mongoose
            .connect(dbConUrl, {
                connectTimeoutMS: 10000,
                socketTimeoutMS: 45000,
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                native_parser: true,
                poolSize: 5,
                user: config.dbUsername,
                pass: config.dbPassword
            })
            .then(() => {
                logger.info(`MongoDB connected successfully to ${dbConUrl}`);
            })
            .catch(err => {
                logger.error(`Error connecting to MongoDB : ${err}`);
                reconnectTimeout += reconnectAfterInterval;
                logger.info(
                    `Trying to reconnect in ${reconnectTimeout / 1000} sec...`
                );
                retryCount++;
                retryCount <= maxNoOfRetries
                    ? setTimeout(connectDB, reconnectTimeout)
                    : logger.error(
                          `Unable to connect to MongoDB. Please check your MongoDB configuration: ${err}`
                      );
            });
    };
    connectDB();
};
