const Test = require('../models/test.model');

exports.get = (req, res, next) => {
  res.status(200).end();
  return next();
};

exports.post = async (req, res, next) => {
  const { name } = req.body;
  const test = new Test({
    name,
  });
  const savedTest = await test.save();
  res.status(201).json(savedTest);
  return next();
};
