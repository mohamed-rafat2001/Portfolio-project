import express from "express";
import {
	createEducation,
	deleteEducation,
	getAllEducations,
	getEducation,
	updateEducation,
} from "../controllers/educationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const Router = express.Router();

// add protect middleware to all routes
Router.use(protect);

Router.route("/").post(createEducation).get(getAllEducations);
Router.route("/:id")
	.get(getEducation)
	.patch(updateEducation)
	.delete(deleteEducation);

export default Router;
