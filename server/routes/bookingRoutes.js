import express from "express";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Booking Route Working 🚀"
    });
});

router.post("/", createBooking);

export default router;