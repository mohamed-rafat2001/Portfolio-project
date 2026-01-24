import { body } from "express-validator";

export const projectValidation = [
	body("title")
		.trim()
		.notEmpty().withMessage("Title is required")
		.isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
	body("description")
		.trim()
		.notEmpty().withMessage("Description is required")
		.isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
	body("techStack")
		.optional()
		.custom((value) => {
			if (typeof value === 'string') {
				try {
					const parsed = JSON.parse(value);
					if (!Array.isArray(parsed)) throw new Error();
				} catch (e) {
					throw new Error("Tech stack must be an array or a JSON string representing an array");
				}
			} else if (!Array.isArray(value)) {
				throw new Error("Tech stack must be an array");
			}
			return true;
		}),
	body("liveUrl")
		.optional()
		.trim()
		.isURL().withMessage("Please enter a valid URL for the live link"),
	body("repoUrl")
		.optional()
		.trim()
		.isURL().withMessage("Please enter a valid URL for the GitHub link"),
];
