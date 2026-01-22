import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { skillValidation } from "../validations/skillValidation.js";
import {
	createSkill,
	deleteSkill,
	getAllSkills,
	getSkill,
	updateSkill,
} from "../controllers/skillController.js";

const Router = express.Router();

// Public routes
Router.get("/", getAllSkills);
Router.get("/:id", getSkill);

// Protected routes
Router.use(protect);
Router.post("/", skillValidation, validate, createSkill);
Router.patch("/:id", skillValidation, validate, updateSkill);
Router.delete("/:id", deleteSkill);

export default Router;
