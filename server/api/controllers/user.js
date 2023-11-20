import User from "../models/User.js";

export const createUser = async (req, res, next) => {
    const newUser = new User(req.body)
    try {
        await newUser.save()
        res.status(200).send("User has been created.")
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
        console.log("Here Here arsh")
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(error) {
        next(error)
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