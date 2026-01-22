import { validationResult } from "express-validator";
import AppError from "../utils/appError.js";

export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMessage = errors
			.array()
			.map((err) => `${err.path}: ${err.msg}`)
			.join(", ");
		return next(new AppError(errorMessage, 400));
	}
	next();
};
