const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: String,
  dob: String,
  gender: String,
  barangay: String,
  favorites: [String],
  history: [String],
  likes: [String],
  provider: String,
  lastLogin: Date,
  isLoggedIn: { type: Boolean, default: false },
  sessions: [
    {
      loginAt: Date,
      device: String,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
