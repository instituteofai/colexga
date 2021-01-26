const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
  },
  allowedTimeInSeconds: {
    type: Number,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
});

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
