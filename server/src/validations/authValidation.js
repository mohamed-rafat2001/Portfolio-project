import { body } from "express-validator";

export const loginValidation = [
	body("email")
		.trim()
		.notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Please enter a valid email"),
	body("password")
		.trim()
		.notEmpty().withMessage("Password is required"),
];
