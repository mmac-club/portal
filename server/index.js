import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Create an instance of Express
const app = express();
dotenv.config();
const port = 3000;

const connect = async () => {
  try {
    console.log(process.env.MONGO)
    await mongoose.connect(process.env.MONGO)
    console.log(chalk.bgGreen('Connected to MongoDb'))
  } catch (error) {
    throw error
  }
}


// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  connect()
  console.log(chalk.hex('#DEADED').bold(`Server is running on port ${port}`));
  console.log(chalk.blue.bgGrey.bold('LINK')+ ': ' + chalk.blue.underline.bold('http://localhost:3000') );
});