// backend/routes/todos.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware ko import karo
const Todo = require('../models/Todo');

// GET all todos for the logged-in user
router.get('/', auth, async (req, res) => { // 'auth' middleware ka istemal karo
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST a new todo for the logged-in user
router.post('/', auth, async (req, res) => { // 'auth' middleware ka istemal karo
  try {
    const newTodo = new Todo({
      text: req.body.text,
      user: req.user.id, // User ki ID ko save karo
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// ... (DELETE and PUT routes will be updated in the next step to be more secure)

module.exports = router;