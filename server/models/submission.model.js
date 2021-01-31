const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  taskId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  question: {
    type: String,
    trim: true,
    required: true,
  },
  questionType: {
    type: String,
    trim: true,
    required: true,
  },
  answer: {
    type: String,
    trim: true,
    required: true,
  },
  timeTakenInSeconds: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  createdOn: {
    type: mongoose.Schema.Types.Date,
  },
  testId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  testName: {
    type: String,
    maxlength: 64,
    trim: true,
  },
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  lastModified: {
    type: mongoose.Schema.Types.Date,
  },
  isEvaluated: {
    type: Boolean,
    required: true,
  },
});

module.exports =
  mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
