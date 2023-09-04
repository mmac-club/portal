import express from "express";
import Users from "../models/Users.js";

const router = express.Router();

router.post("/", async(req, res) => {
    const newUser = new Users(req.body)
    

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(error) {
        res.status(500).json(err)
    }
})

export default router