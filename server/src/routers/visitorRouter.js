import express from "express";
import {
	trackVisitor,
	getAllVisitors,
	deleteVisitor,
} from "../controllers/visitorController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/track", trackVisitor);

// Protected routes
router.use(protect, restrictTo("Admin"));
router.get("/", getAllVisitors);
router.delete("/:id", deleteVisitor);

export default router;
