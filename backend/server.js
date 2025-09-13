// backend/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth'); // Auth routes ko import karo

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes ka istemal karo
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes); // Auth routes ko use karo
// Health check route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});