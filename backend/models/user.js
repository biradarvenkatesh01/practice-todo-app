// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Har username alag hona chahiye
    trim: true, // Shuru aur aakhir ke extra spaces hata dega
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // CreatedAt aur UpdatedAt timestamps automatically add ho jayenge
});

module.exports = mongoose.model('User', UserSchema);