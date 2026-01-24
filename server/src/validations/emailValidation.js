import { body } from "express-validator";

export const emailValidation = [
	body("userName")
		.trim()
		.notEmpty().withMessage("Name is required")
		.isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
	body("userEmail")
		.trim()
		.notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Please enter a valid email"),
	body("phoneNumber")
		.optional()
		.trim(),
	body("subject")
		.optional()
		.trim(),
	body("emailBody")
		.trim()
		.notEmpty().withMessage("Message is required")
		.isLength({ min: 10 }).withMessage("Message must be at least 10 characters"),
];
