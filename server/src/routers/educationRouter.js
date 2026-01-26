import express from "express";
import {
	createEducation,
	deleteEducation,
	getAllEducations,
	getEducation,
	updateEducation,
} from "../controllers/educationController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multer.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { educationValidation } from "../validations/educationValidation.js";

const getFunction = (mod) => {
	if (typeof mod === "function") return mod;
	if (mod && typeof mod.default === "function") return mod.default;
	return mod;
};

const expressFunc = getFunction(express);
const Router = expressFunc.Router();

// Public routes
Router.get("/", getAllEducations);
Router.get("/:id", getEducation);

// Protected routes
Router.use(protect);

const uploadFields = upload.fields([
	{ name: "images", maxCount: 5 },
	{ name: "attachments", maxCount: 5 },
]);

Router.post("/", uploadFields, educationValidation, validate, createEducation);
Router.patch("/:id", uploadFields, educationValidation, validate, updateEducation);
Router.delete("/:id", deleteEducation);

export default Router;
