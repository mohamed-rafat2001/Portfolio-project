import express from "express";
import {
	createExperience,
	deleteExperience,
	getAllExperiences,
	getExperience,
	updateExperience,
} from "../controllers/experienceController.js";
import { protect } from "../middlewares/authMiddleware.js";

const Router = express.Router();

// add protect middleware to all routes
Router.use(protect);

Router.route("/").post(createExperience).get(getAllExperiences);
Router.route("/:id")
	.get(getExperience)
	.patch(updateExperience)
	.delete(deleteExperience);

export default Router;
