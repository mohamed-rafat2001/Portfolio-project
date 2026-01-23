import express from "express";
import {
	createSkill,
	deleteSkill,
	getAllSkills,
	getSkill,
	updateSkill,
} from "../controllers/skillController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSkills);
router.get("/:id", getSkill);

// Protected routes
router.use(protect, restrictTo("Admin"));
router.post("/", createSkill);
router.patch("/:id", updateSkill);
router.delete("/:id", deleteSkill);

export default router;
