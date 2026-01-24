import { body } from "express-validator";

export const educationValidation = [
	body("institution")
		.trim()
		.notEmpty()
		.withMessage("School/Institution name is required")
		.isLength({ min: 3 })
		.withMessage("Institution name must be at least 3 characters"),
	body("degree")
		.trim()
		.notEmpty()
		.withMessage("Degree is required")
		.isLength({ min: 3 })
		.withMessage("Degree must be at least 3 characters"),
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Description is required")
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 characters"),
	body("duration")
		.trim()
		.notEmpty()
		.withMessage("Duration is required"),
];
