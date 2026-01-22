import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { loginValidation } from "../validations/authValidation.js";

import {
	forgotPassword,
	login,
	logOut,
	resetPassword,
} from "../controllers/authController.js";

const Router = express.Router();

Router.post("/login", loginValidation, validate, login);
Router.post("/logout", protect, logOut);
Router.post("/forgotPassword", forgotPassword);
Router.patch("/resetPassword", resetPassword);

export default Router;
