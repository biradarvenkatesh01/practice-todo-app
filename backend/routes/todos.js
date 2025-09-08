// backend/routes/todos.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  // YEH LINE ADD KARO
  console.log("GET request received for /api/todos");

  const todos = await Todo.find();
  res.json(todos);
});

// ... baaki ke routes waise hi rahenge ...
// POST, DELETE, PUT routes
router.post('/', async (req, res) => {
    const newTodo = new Todo({
      text: req.body.text,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});

router.delete('/:id', async (req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
});

router.put('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.json(todo);
});

module.exports = router;