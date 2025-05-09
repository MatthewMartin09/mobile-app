const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loginAt: { type: Date, default: Date.now },
  device: { type: String, required: true },
  email: String,
  name: String
});

module.exports = mongoose.model('session', sessionSchema);
