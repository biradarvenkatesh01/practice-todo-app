// // backend/routes/todos.js

// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth'); // <-- Import the middleware
// const Todo = require('../models/Todo');

// // GET all todos for the logged-in user
// router.get('/', auth, async (req, res) => { // <-- Use the 'auth' middleware
//   const todos = await Todo.find({ user: req.user.id });
//   res.json(todos);
// });

// // POST a new todo for the logged-in user
// router.post('/', auth, async (req, res) => { // <-- Use the 'auth' middleware
//   const newTodo = new Todo({
//     text: req.body.text,
//     user: req.user.id, // Associate the todo with the user
//   });
//   const savedTodo = await newTodo.save();
//   res.json(savedTodo);
// });

// // DELETE a todo
// router.delete('/:id', auth, async (req, res) => { // <-- Use the 'auth' middleware
//    // Add logic to ensure user owns the todo before deleting (optional but good practice)
//   const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
//   res.json(deletedTodo);
// });

// // UPDATE (complete) a todo
// router.put('/:id', auth, async (req, res) => { // <-- Use the 'auth' middleware
//   const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
//   todo.isCompleted = !todo.isCompleted;
//   await todo.save();
//   res.json(todo);
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

// GET all todos for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new todo
router.post('/', auth, async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      user: req.user.id,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deletedTodo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.json(deletedTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// UPDATE (toggle completion)
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
