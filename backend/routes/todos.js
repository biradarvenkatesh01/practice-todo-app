// backend/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET: Saare todos laane ke liye
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST: Naya todo save karne ke liye
router.post('/', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

// DELETE: Ek todo ko delete karne ke liye
router.delete('/:id', async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

// PUT: Ek todo ko update (complete/incomplete) karne ke liye
router.put('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.json(todo);
});

module.exports = router;