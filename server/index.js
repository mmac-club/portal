import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from "./api/routes/users.js"
import authRoute from "./api/routes/register.js"

// Create an instance of Express
const app = express();
dotenv.config();
const port = 3000;

const connect = async () => {
  try {
    console.log(chalk.bgRed(process.env.MONGO_DB_DEV))
    await mongoose.connect(process.env.MONGO_DEV)
    console.log(chalk.bgGreen('Connected to MongoDb'))
  } catch (error) {
    throw error
  }
}



// middlewares
app.use(express.json())
app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

// Start the server
app.listen(port, () => {
  connect()
  console.log(chalk.hex('#DEADED').bold(`Server is running on port ${port}`));
});