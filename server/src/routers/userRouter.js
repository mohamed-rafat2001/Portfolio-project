import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/cloudinaryConfig.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
	updateMeValidation,
	updateInfosValidation,
	updatePasswordValidation,
} from "../validations/userValidation.js";

import {
	getMe,
	profileImg,
	updateMe,
	updateInfos,
	updatePassword,
	getAdminInfo,
} from "../controllers/userController.js";

// Helper to handle ESM/CJS interop
const getFunction = (mod) => {
	if (typeof mod === "function") return mod;
	if (mod && typeof mod.default === "function") return mod.default;
	return mod;
};

const expressFunc = getFunction(express);
const Router = expressFunc.Router();

Router.get("/admin-info", getAdminInfo);

// add protect middleware to all routes
Router.use(protect);

Router.route("/").get(getMe).patch(updateMeValidation, validate, updateMe);
Router.patch("/update-infos", updateInfosValidation, validate, updateInfos);
Router.patch("/profileImg", upload.single("profileImg"), profileImg);
Router.patch("/updatePassword", updatePasswordValidation, validate, updatePassword);

export default Router;
