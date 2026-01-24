import express from "express";
import {
	createProject,
	deleteProject,
	getAllProjects,
	getProject,
	updateProject,
	uploadProjectImages,
    incrementProjectViews,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../utils/multer.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { projectValidation } from "../validations/projectValidation.js";

const Router = express.Router();

const projectUpload = upload.fields([
	{ name: "mainImg", maxCount: 1 },
	{ name: "images", maxCount: 30 },
]);

// Public routes
Router.get("/", getAllProjects);
Router.get("/:id", getProject);
Router.patch("/:id/views", incrementProjectViews);

// Protected routes
Router.use(protect);
Router.post(
	"/",
	projectUpload,
	uploadProjectImages,
	projectValidation,
	validate,
	createProject
);
Router.patch(
	"/:id",
	projectUpload,
	uploadProjectImages,
	projectValidation,
	validate,
	updateProject
);
Router.delete("/:id", deleteProject);

export default Router;
