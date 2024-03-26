import express from "express";

import { order, capture, get_membership_details_by_id, get_all_membership } from "../controllers/payment_handler.js"

const router = express.Router();

router.post("/", order)
router.post("/:id/capture", capture)
router.get("/:id", get_membership_details_by_id)
router.get("/", get_all_membership)

export default router