    // Import the express library
    const express = require('express');
    
    // Create an instance of an Express application
    const app = express();
    
    // Define the port the server will run on. 
    // We use a variable for the port, which is a good practice.
    const PORT = 5000;
    
    // Create a simple GET route for the root URL ('/')
    // This is just to test if our server is working.
    app.get('/', (req, res) => {
      res.send('Hello from the To-Do App Backend!');
    });
    
    // Start the server and make it listen for incoming requests on the specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });