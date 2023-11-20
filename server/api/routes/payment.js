import express from "express";

import { order, captureOrder } from "../controllers/payment_handler.js"

const router = express.Router();


router.post("/", order)
router.post("/:id/capture", captureOrder)

export default router