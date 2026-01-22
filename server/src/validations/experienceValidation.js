import { body } from "express-validator";

export const experienceValidation = [
	body("company")
		.trim()
		.notEmpty()
		.withMessage("Company name is required")
		.isLength({ min: 2 })
		.withMessage("Company name must be at least 2 characters"),
	body("role")
		.trim()
		.notEmpty()
		.withMessage("Role is required"),
	body("duration")
		.trim()
		.notEmpty()
		.withMessage("Duration is required"),
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Description is required")
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 characters"),
];
