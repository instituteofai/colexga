const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
    required: true,
  },
  allowedTimeInSeconds: {
    type: Number,
    required: true,
  },
  test: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
});

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
