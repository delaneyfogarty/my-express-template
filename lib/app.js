const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authenticate = require('./middleware/authenticate');
const auth = require('./controller/auth');
const notFound = require('./middleware/not-found');
const error = require('./middleware/error');
const gemstones = require('./controller/gemstones');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', auth);
app.use('/api/v1/gemstones', authenticate, gemstones);

app.use(notFound);
app.use(error);

module.exports = app;
