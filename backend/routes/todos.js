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

// @route   PUT api/todos/:id
// @desc    Update a todo
router.put('/:id', auth, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        // Make sure user owns the todo
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        todo.isCompleted = !todo.isCompleted;

        await todo.save();

        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/todos/:id
// @desc    Delete a todo
router.delete('/:id', auth, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        // Make sure user owns the todo
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await todo.remove();

        res.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;