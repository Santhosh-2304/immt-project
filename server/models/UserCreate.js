// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // plain text per your request
  type: { type: String, enum: ['Normal', 'Super', 'Admin'], default: 'Normal' },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  forgotPassword: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
