import express from "express";
import { getPricing } from "../controllers/pricingController.js";

const router = express.Router();

router.get("/", getPricing);

export default router;