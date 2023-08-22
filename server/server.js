// Import required modules
const express = require('express');

// Create an instance of Express
const app = express();
const port = 3000; // Port number for the server

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
