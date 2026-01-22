import express from "express";
import {
	createExperience,
	deleteExperience,
	getAllExperiences,
	getExperience,
	updateExperience,
} from "../controllers/experienceController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { experienceValidation } from "../validations/experienceValidation.js";

const Router = express.Router();

// Public routes
Router.get("/", getAllExperiences);
Router.get("/:id", getExperience);

// Protected routes
Router.use(protect);
Router.post("/", experienceValidation, validate, createExperience);
Router.patch("/:id", experienceValidation, validate, updateExperience);
Router.delete("/:id", deleteExperience);

export default Router;
