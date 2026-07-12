import express from "express";
import cors from "cors";

import systemRoutes from "./routes/systemRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "GameStop TheVanguard API Running 🚀"
    });
});

app.use("/systems", systemRoutes);
app.use("/pricing", pricingRoutes);
app.use("/bookings", bookingRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});