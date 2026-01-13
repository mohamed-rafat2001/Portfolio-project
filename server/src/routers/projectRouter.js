import express from "express";
import {
	createProject,
	deleteProject,
	getAllProjects,
	getProject,
	updateProject,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const Router = express.Router();
// add protect middleware to all routes
Router.use(protect);

Router.route("/").post(createProject).get(getAllProjects);
Router.route("/:id").get(getProject).patch(updateProject).delete(deleteProject);

export default Router;
