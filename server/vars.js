const path = require('path');

require('dotenv-safe').config({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  google: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUrl: process.env.REDIRECT_URL,
  },
  session: {
    cookieKey: process.env.COOKIE_KEY,
  },
};
