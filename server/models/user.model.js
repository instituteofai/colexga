const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  tasksCompleted: {
    type: Array,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
