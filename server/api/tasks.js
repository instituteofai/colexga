const Task = require('../models/task.model');

exports.get = async (req, res, next) => {
  const tasks = await Task.find({ test: req.params.testId });
  res.status(200).json({ tasks });
  return next();
};

exports.post = async (req, res, next) => {
  const task = new Task(req.body);
  const savedTask = await task.save();
  res.status(201).json(savedTask);
  return next();
};

exports.put = async (req, res, next) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    test: req.params.testId,
  });
  if (!task) {
    return res.status(400).end();
  }
  Object.assign(task, req.body);
  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
  return next();
};

exports.delete = async (req, res, next) => {
  await Task.findOneAndDelete({
    _id: req.params.taskId,
    test: req.params.testId,
  });
  res.status(204).end();
  return next();
};
