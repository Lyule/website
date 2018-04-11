const express = require('express');
const path = require('path');

const hbs = require('express-hbs');

const config = require('./config');

const app = express();

const winston = require('winston');
const expressWinston = require('express-winston');


app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', hbs.express4({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'view/layout'),
    defaultLayout: path.resolve(__dirname, 'view/layout/layout.hbs'), // absolute path
    partialsDir: path.join(__dirname, 'view/partial')
}));

app.set('view engine', 'hbs');
app.set('views', [path.join(__dirname, 'view'), path.join(__dirname, 'apps/view')]);

try {
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            })
        ],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function(req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }));
} catch (err) {
    console.log(`service middle catch error: ${err}`);
}

require('./apps/router')(app);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}));

app.listen(config.port || 3000, function() {
    console.info(`${config.app} service start port ${config.port}`);
});