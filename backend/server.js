require('dotenv').config(); // ✅ MUST BE FIRST!

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);

mongoose.set('strictQuery', false); // optional

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully.'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Listen for runtime connection errors
mongoose.connection.on('error', err => {
  console.error('❌ MongoDB runtime connection error:', err);
});

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
