const Submission = require('../models/submission.model');

exports.get = async (req, res) => {
  const submissions = await Submission.find({ userId: req.params.userId });
  return res.status(200).json({ submissions });
};

exports.post = async (req, res) => {
  const submission = new Submission(req.body);
  const savedSubmission = await submission.save();
  return res.status(201).json(savedSubmission);
};

exports.put = async (req, res) => {
  const submission = await Submission.findById(req.params.submissionId);
  if (!submission) {
    return res.status(400).end();
  }
  Object.assign(submission, req.body);
  const updatedSubmission = await submission.save();
  return res.status(200).json(updatedSubmission);
};

exports.delete = async (req, res) => {
  await Submission.findByIdAndDelete(req.params.submissionId);
  return res.status(204).end();
};
