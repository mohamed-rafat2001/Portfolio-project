import express from "express";
import { trackVisit, getStats } from "../controllers/analyticsController.js";
import { protect } from "../middlewares/authMiddleware.js";

// Helper to handle ESM/CJS interop
const getFunction = (mod) => {
	if (typeof mod === "function") return mod;
	if (mod && typeof mod.default === "function") return mod.default;
	return mod;
};

const expressFunc = getFunction(express);
const router = expressFunc.Router();

// Public route to track visits
router.post("/track", trackVisit);

// Protected route to get stats
router.get("/stats", protect, getStats);

export default router;
