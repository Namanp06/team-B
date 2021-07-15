const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const log4js = require('log4js');
const rfs = require('rotating-file-stream');
require('dotenv').config();

const app = express();

let logger;
let accessLogStream;

if (process.env.NODE_ENV !== 'development') {
    // Create logs directory if dosn't exist
    if (!fs.existsSync('./logs')) {
        fs.mkdirSync('./logs');
    }

    // log4js server logs
    logger = log4js
        .configure({
            appenders: {
                console: {
                    type: 'stdout',
                    layout: {
                        type: 'colored'
                    }
                },
                file: {
                    type: 'dateFile',
                    filename: 'logs/server.log'
                }
            },
            categories: {
                default: {
                    appenders: ['console', 'file'],
                    level: 'debug'
                }
            }
        })
        .getLogger();

    // create a rotating write stream for access log
    accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, '../', 'logs')
    });
} else {
    logger = log4js.getLogger();
}

logger.level = 'debug';

const logStream =
    process.env.NODE_ENV !== 'development'
        ? {
              stream: accessLogStream
          }
        : null;

// setup the logger
app.use(
    morgan(
        ':date[iso] :method :url :status :res[X-Total-Count] - :response-time ms',
        logStream
    )
);

module.exports = logger;
