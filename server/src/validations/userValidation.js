import { body } from "express-validator";

export const updateMeValidation = [
	body("name")
		.optional()
		.trim()
		.isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
	body("email")
		.optional()
		.trim()
		.isEmail().withMessage("Please enter a valid email"),
	body("phoneNumber")
		.optional()
		.trim(),
    body("location")
        .optional()
        .trim(),
    body("aboutMe")
        .optional()
        .trim(),
    body("socialMedia")
        .optional()
        .isArray().withMessage("Social media must be an array"),
    body("socialMedia.*.name")
        .optional()
        .trim(),
    body("socialMedia.*.url")
        .optional()
        .trim()
        .isURL().withMessage("Please enter a valid URL"),
    body("infos.job.title")
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage("Job title must be at least 3 characters"),
    body("infos.job.note")
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage("Job note must be at least 10 characters"),
    body("infos.aboutMe.title")
        .optional()
        .trim()
        .isLength({ min: 3 }).withMessage("About title must be at least 3 characters"),
    body("infos.aboutMe.message")
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage("About message must be at least 10 characters"),
    body("infos.available")
        .optional()
        .isBoolean().withMessage("Available must be a boolean"),
];

export const updateInfosValidation = [
	body("infos.job.title")
		.optional()
		.trim()
		.isLength({ min: 5 }).withMessage("Job title must be at least 5 characters"),
	body("infos.job.note")
		.optional()
		.trim()
		.isLength({ min: 20 }).withMessage("Job note must be at least 20 characters"),
	body("infos.aboutMe.title")
		.optional()
		.trim()
		.isLength({ min: 5 }).withMessage("About title must be at least 5 characters"),
	body("infos.aboutMe.message")
		.optional()
		.trim()
		.isLength({ min: 20 }).withMessage("About message must be at least 20 characters"),
	body("infos.location")
		.optional()
		.trim()
		.notEmpty().withMessage("Location cannot be empty"),
	body("infos.available")
		.optional()
		.isBoolean().withMessage("Available must be a boolean"),
	body("infos.socialMedia")
		.optional()
		.isArray().withMessage("Social media must be an array"),
	body("infos.socialMedia.*.name")
		.optional()
		.trim()
		.notEmpty().withMessage("Social media name is required"),
	body("infos.socialMedia.*.url")
		.optional()
		.trim()
		.isURL().withMessage("Please enter a valid URL"),
];

export const updatePasswordValidation = [
	body("passwordCurrent")
		.trim()
		.notEmpty().withMessage("Current password is required"),
	body("password")
		.trim()
		.notEmpty().withMessage("New password is required")
		.isLength({ min: 8 }).withMessage("New password must be at least 8 characters"),
	body("passwordConfirm")
		.trim()
		.notEmpty().withMessage("Password confirmation is required")
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords do not match");
			}
			return true;
		}),
];
