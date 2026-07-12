import express from "express";
import { getSystems } from "../controllers/systemController.js";

const router = express.Router();

router.get("/", getSystems);

export default router;