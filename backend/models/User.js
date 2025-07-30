const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  password: String,
  googleId: { type: String, unique: true, sparse: true },
  picture: String,
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
