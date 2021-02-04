const Task = require('../models/task.model');

exports.get = async (req, res) => {
  const tasks = await Task.find({ test: req.params.testId });
  return res.status(200).json({ tasks });
};

exports.post = async (req, res) => {
  const test = req.params.testId;
  const task = new Task({ ...req.body, test });
  const savedTask = await task.save();
  return res.status(201).json(savedTask);
};

exports.put = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    test: req.params.testId,
  });
  if (!task) {
    return res.status(400).end();
  }
  Object.assign(task, req.body);
  const updatedTask = await task.save();
  return res.status(200).json(updatedTask);
};

exports.delete = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.taskId,
    test: req.params.testId,
  });
  return res.status(204).end();
};
