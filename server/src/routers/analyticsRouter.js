import express from "express";
import { trackVisit, getStats } from "../controllers/analyticsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route to track visits
router.post("/track", trackVisit);

// Protected route to get stats
router.get("/stats", protect, getStats);

export default router;
