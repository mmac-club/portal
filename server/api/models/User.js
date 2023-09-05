import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true 
    },    
    lastname: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    postalCode: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("user", UserSchema)