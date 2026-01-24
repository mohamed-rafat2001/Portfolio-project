import { body } from "express-validator";

export const skillValidation = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Skill category name is required"),
	body("skills")
		.isArray({ min: 1 })
		.withMessage("At least one skill is required"),
	body("skills.*.name")
		.trim()
		.notEmpty()
		.withMessage("Skill name is required"),
	body("skills.*.percentage")
		.isInt({ min: 0, max: 100 })
		.withMessage("Percentage must be between 0 and 100"),
];
