// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todos'); // Routes waali file ko import karo

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Server ko batao ki /api/todos par in routes ka istemal karna hai
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});