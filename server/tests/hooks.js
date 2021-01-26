const { MongoMemoryServer } = require('mongodb-memory-server');

exports.mochaHooks = {
  beforeAll: async () => {
    const mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();
    process.env.MONGO_URI = uri;
    process.env.NODE_ENV = 'test';
    // eslint-disable-next-line global-require
    const mongoose = require('../mongoose');
    await mongoose.connect();
  },
};
