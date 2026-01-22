import express from "express";
import {
	createProject,
	deleteProject,
	getAllProjects,
	getProject,
	updateProject,
	uploadProjectImages,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../utils/multer.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { projectValidation } from "../validations/projectValidation.js";

const Router = express.Router();

// Public routes
Router.get("/", getAllProjects);
Router.get("/:id", getProject);

// Protected routes
Router.use(protect);
Router.post(
	"/",
	upload.fields([
		{ name: "mainImg", maxCount: 1 },
		{ name: "images", maxCount: 30 },
	]),
	uploadProjectImages,
	projectValidation,
	validate,
	createProject
);
Router.patch(
	"/:id",
	upload.fields([
		{ name: "mainImg", maxCount: 1 },
		{ name: "images", maxCount: 30 },
	]),
	uploadProjectImages,
	projectValidation,
	validate,
	updateProject
);
Router.delete("/:id", deleteProject);

export default Router;
