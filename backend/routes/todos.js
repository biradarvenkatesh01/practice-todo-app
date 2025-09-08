// backend/routes/todos.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Instruction to GET all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Instruction to POST (save) a new todo
router.post('/', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

// Instruction to DELETE a todo
router.delete('/:id', async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

// Instruction to UPDATE (complete) a todo
router.put('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.isCompleted = !todo.isCompleted;
  await todo.save();
  res.json(todo);
});

module.exports = router;