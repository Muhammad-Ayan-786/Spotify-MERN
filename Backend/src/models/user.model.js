const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Email already exists']
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email already exists']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'artist'],
    default: 'user'
  }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;