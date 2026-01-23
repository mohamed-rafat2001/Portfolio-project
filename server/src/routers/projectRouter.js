import express from "express";
import {
	createProject,
	deleteProject,
	getAllProjects,
	getProject,
	updateProject,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/cloudinaryConfig.js";

const Router = express.Router();
// add protect middleware to all routes
Router.use(protect);

const projectUpload = upload.fields([
	{ name: "cover", maxCount: 1 },
	{ name: "images", maxCount: 5 },
]);

Router.route("/").post(projectUpload, createProject).get(getAllProjects);
Router.route("/:id")
	.get(getProject)
	.patch(projectUpload, updateProject)
	.delete(deleteProject);

export default Router;
