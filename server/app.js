const express = require('express');
const { resolve } = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const setup = require('./middlewares/frontendMiddleware');
const { session } = require('./vars');
require('./utils/passport-setup');

const app = express();

// Parse cookies
app.use(cookieParser());
// parse body params and attache them to req.body
app.use(bodyParser.json());

// Custom backend-specific middleware here
const api = require('./api');

app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, // ms
    keys: [session.cookieKey],
  }),
);

app.use(passport.initialize());
// Deserialize cookie from the browser
app.use(passport.session());
app.use('/api', api);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

module.exports = app;
