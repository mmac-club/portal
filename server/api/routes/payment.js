import express from "express";

import { order, capture } from "../controllers/payment_handler.js"

const router = express.Router();

router.post("/", order)
router.post("/:id/capture", capture)

export default router