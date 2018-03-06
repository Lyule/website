const _ = require('lodash');

const env = process.env.NODE_ENV || 'development';

const config = {
    app: 'Website',
    port: 8888,
    loggers: {
        console: {
            level: 'debug',
            colorize: 'all',
            prettyPrint: true,
            handleExceptions: true
        },
        infoFile: {
            name: 'info',
            level: 'info',
            filename: 'logs/info.log',
            maxFiles: 7
        },
        errorFile: {
            name: 'error',
            level: 'error',
            filename: 'logs/error.log',
            handleExceptions: true
        }
    }
}

switch (env) {
    case 'production':
        try {
            const production = require('production');

            _.extend(config, production);
        } catch (err) {
            throw 'production config file not exists';
        }
        break;
    default:
        try {
            const development = require('./development');

            _.extend(config, development);
        } catch (e) {
            throw 'development config file not exists';
        }
        break;
}


module.exports = config;