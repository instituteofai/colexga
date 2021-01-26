const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 64,
    index: true,
    trim: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.Test || mongoose.model('Test', testSchema);
