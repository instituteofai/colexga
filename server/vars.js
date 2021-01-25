const path = require('path');

require('dotenv-safe').load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  mongo: {
    uri: process.env.MONGO_URI,
  },
};
