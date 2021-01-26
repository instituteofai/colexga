const Test = require('../models/test.model');
const Task = require('../models/task.model');

exports.get = async (req, res) => {
  const tests = await Test.find();
  return res.status(200).json({ tests });
};

exports.post = async (req, res) => {
  const { name } = req.body;
  const test = new Test({
    name,
  });
  const savedTest = await test.save();
  return res.status(201).json(savedTest);
};

exports.put = async (req, res) => {
  const test = await Test.findById(req.params.testId);
  Object.assign(test, req.body);
  const updatedTest = await test.save();
  return res.status(200).json(updatedTest);
};

exports.delete = async (req, res) => {
  await Test.findByIdAndDelete(req.params.testId);
  await Task.deleteMany({ test: req.params.testId });
  return res.status(204).end();
};
