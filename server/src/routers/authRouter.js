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

// Helper to handle ESM/CJS interop
const getFunction = (mod) => {
	if (typeof mod === "function") return mod;
	if (mod && typeof mod.default === "function") return mod.default;
	return mod;
};

const expressFunc = getFunction(express);
const Router = expressFunc.Router();

Router.post("/login", loginValidation, validate, login);
Router.post("/logout", protect, logOut);
Router.post("/forgotPassword", forgotPassword);
Router.patch("/resetPassword", resetPassword);

export default Router;
