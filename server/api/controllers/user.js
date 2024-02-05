import User from "../models/User.js";

export const createUser = async (req, res, next) => {
    const newUser = new User(req.body) 
    console.log(newUser)
    try {
        await newUser.save()
        res.status(200).json({"message":"User has been created."})
    }
    catch(error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        { new: true })
        res.status(200).json("User has been Updated.")
    }
    catch(error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }
    catch(error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { firebase_uid } = req.params;
        // Use findOne with the appropriate query to find the user by firebase_uid
        const user = await User.findOne({ firebase_uid : firebase_uid });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } 
    catch (error) {
        next(error);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }
    catch(error) {
        next(error)
    }
}