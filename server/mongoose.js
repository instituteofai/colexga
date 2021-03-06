const mongoose = require('mongoose');
const logger = require('./logger');
const { env, mongo } = require('./vars');

mongoose.connection.on('error', err => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

if (env === 'development') {
  mongoose.set('debug', true);
}

exports.connect = () => {
  mongoose
    .connect(mongo.uri, {
      useCreateIndex: true,
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => logger.log('mongoDB connected...'));
  return mongoose.connection;
};
