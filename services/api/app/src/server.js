const express = require('express');
const cors = require('cors');
const router = require('./router');
const bodyParser = require('body-parser');
const db = require('./db');
const config = require('../config/config');
const app = express();
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const passportAuth = require('./authentication/passport');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const log4js = require('log4js');
const rfs = require('rotating-file-stream');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
require('dotenv').config();
let log;
let accessLogStream;

// Access and server logs
if (isNaN(config.port)) {
    log.error(`invalid port config value: ${config.port}`);
    process.exit(1);
}

if (app.get('env') !== 'development') {
    // Create logs directory if dosn't exist
    if (!fs.existsSync('./logs')) {
        fs.mkdirSync('./logs');
    }

    // log4js server logs
    log = log4js
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
    log = log4js.getLogger();
}

log.level = 'debug';

const logStream =
    app.get('env') !== 'development'
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

// Connect to db
db.connect();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(methodOverride());
app.use(cookieParser('secret123'));

// Initialize Passport!  Also use passport.session() middleware, to support persistent login sessions if required.
app.use(passport.initialize());
app.use(passportAuth);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type, Authorization'
    );
    next();
});

app.use(
    fileUpload({
        limits: {
            fileSize: 2 * 1024 * 1024
        },
        abortOnLimit: true
    })
);

app.use('/', router);
app.use('/api', router);

app.listen(config.port, () => {
    log.info(`Your server is listening on port ${config.port}`);
    log.info('Swagger-ui is available on /docs');
});

exports.app = app;
exports.log = log;
