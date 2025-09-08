// backend/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ===== IMPORTANT PART 1: Routes ko Import karna =====
// Yeh line 'routes/todos.js' file mein likhe saare API instructions ko import karti hai.
// Iske bina, server ko pata hi nahi chalega ki /api/todos par kya karna hai.
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// ===== IMPORTANT PART 2: Routes ko Istemal karna =====
// Yeh line server ko batati hai, "Jab bhi koi request '/api/todos' se shuru ho,
// to saari handling 'todoRoutes' waali file ko de do."
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});