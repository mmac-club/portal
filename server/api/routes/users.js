import express from "express";
import User from "../models/User.js";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { registerParticipant } from "../controllers/basketball_recreational_registration.js";

const router = express.Router();

// CREATE A NEW USER
router.post("/", createUser)

// UPDATE
router.put("/:id", updateUser)

// DELETE
router.delete("/:id", deleteUser)

// GET
router.get("/:firebase_uid", getUser)

// GET ALL
router.get("/", getAllUsers)

// Register for Participant
router.get("/register-participant/:id", registerParticipant)

export default router

