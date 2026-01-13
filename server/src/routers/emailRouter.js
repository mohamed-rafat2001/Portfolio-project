import express from "express";
import {
	createEmail,
	deleteEmail,
	getAllEmails,
	getEmail,
} from "../controllers/emailController.js";
import { protect } from "../middlewares/authMiddleware.js";

const Router = express.Router();

// add protect middleware to all routes
Router.use(protect);

Router.route("/").post(createEmail).get(getAllEmails);
Router.route("/:id").get(getEmail).delete(deleteEmail);

export default Router;
