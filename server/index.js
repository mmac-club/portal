import express from 'express';
import chalk from 'chalk';

// Create an instance of Express
const app = express();
const port = 3000;

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(chalk.hex('#DEADED').bold(`Server is running on port ${port}`));
  console.log(chalk.blue.bgGrey.bold('LINK')+ ': ' + chalk.blue.underline.bold('http://localhost:3000') );
});