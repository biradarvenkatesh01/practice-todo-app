// backend/models/Todo.js
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  // YEH NAYA FIELD ADD KARO
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Yeh 'User' model se juda hai
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Todo', TodoSchema);