const Test = require('../models/test.model');

exports.get = async (req, res, next) => {
  const tests = await Test.find();
  res.status(200).json({ tests });
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
