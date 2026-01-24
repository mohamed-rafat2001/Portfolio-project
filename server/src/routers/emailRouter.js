import express from "express";
import {
	createEmail,
	deleteEmail,
	getAllEmails,
	getEmail,
	updateEmailStatus,
} from "../controllers/emailController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { emailValidation } from "../validations/emailValidation.js";

const Router = express.Router();

Router.route("/").post(emailValidation, validate, createEmail);

// add protect middleware to all routes
Router.use(protect);

Router.route("/").get(getAllEmails);
Router.route("/:id").get(getEmail).delete(deleteEmail).patch(updateEmailStatus);

export default Router;
