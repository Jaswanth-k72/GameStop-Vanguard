import express from "express";

import {
    createBooking,
    getBookings,
    approveBooking,
    rejectBooking,
    startSession,
    completeSession,
    getHistory,
    createWalkIn
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/walkin", createWalkIn);

router.post("/", createBooking);

router.get("/history", getHistory);

router.get("/", getBookings);

router.patch("/:id/approve", approveBooking);

router.patch("/:id/reject", rejectBooking);

router.patch("/:id/start", startSession);

router.patch("/:id/complete", completeSession);

export default router;