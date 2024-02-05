import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    firebase_uid: {
      type: String,  // Set the type to String
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    postalCode: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);
