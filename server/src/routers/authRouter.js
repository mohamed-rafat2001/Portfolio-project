import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
	forgotPassword,
	login,
	logOut,
	resetPassword,
	signUp,
} from "../controllers/authController.js";

const Router = express.Router();

Router.post("/signup", signUp);
Router.post("/login", login);
Router.post("/logout", protect, logOut);
Router.post("/forgotPassword", forgotPassword);
Router.patch("/resetPassword", resetPassword);

export default Router;
