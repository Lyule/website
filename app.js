const express = require('express');
const path = require('path');
const serve = require('serve');

const hbs = require('express-hbs');

const config = require('./config');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', hbs.express4({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'view/layout'),
  defaultLayout: path.resolve(__dirname, 'view/layout/layout.hbs'), // absolute path
  partialsDir: path.join(__dirname, 'view/partial')
}));

app.set('view engine', 'hbs');
app.set('views', [path.join(__dirname, 'apps/view'), path.join(__dirname, 'view')]);

require('./apps/router')(app);

app.listen(config.port || 3000, function() {
    console.info(`${config.app} service start port ${config.port}`);
});