const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleProfileId: {
    type: String,
    trim: true,
    required: true,
  },
  displayName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
