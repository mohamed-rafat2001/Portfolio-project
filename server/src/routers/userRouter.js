import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
	getMe,
	profileImg,
	updateMe,
	updatePassword,
} from "../controllers/userController.js";

const Router = express.Router();

// add protect middleware to all routes
Router.use(protect);

Router.route("/").get(getMe).patch(updateMe);
Router.patch("/profileImg", profileImg);
Router.patch("/updatePassword", updatePassword);
export default Router;
