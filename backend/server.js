// backend/server.js

// Load environment variables from .env file
require('dotenv').config();

// Import the express library
const express = require('express');

// Create an instance of the express app
const app = express();

// Use the PORT from the .env file, or 5000 as a default
const PORT = process.env.PORT || 5000;

// Create a basic route to handle GET requests
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server is active and listening on port ${PORT}`);
});