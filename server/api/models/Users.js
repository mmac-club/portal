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
    isAdmin: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("user", UserSchema)