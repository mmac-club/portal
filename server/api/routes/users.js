import express from "express";
import User from "../models/User.js";

const router = express.Router();

// CREATE A NEW USER
router.post("/", async(req, res) => {
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(error) {
        res.status(500).json(err)
    }
})

// UPDATE
router.put("/:id", async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        { new: true })
        res.status(200).json(updatedUser)
    }
    catch(error) {
        res.status(500).json(err)
    }
})
// DELETE
router.delete("/:id", async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }
    catch(error) {
        res.status(500).json(err)
    }
})
// GET
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(error) {
        res.status(500).json(err)
    }
})
// GET ALL
router.get("/", async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }
    catch(error) {
        res.status(500).json(err)
    }
})
export default router