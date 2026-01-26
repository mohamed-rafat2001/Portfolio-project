import { validationResult } from "express-validator";
import appError from "../utils/appError.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const AppError = getExport(appError);
const validationResultFunc = getExport(validationResult);

export const validate = (req, res, next) => {
	const errors = validationResultFunc(req);
	if (!errors.isEmpty()) {
		const errorMessage = errors
			.array()
			.map((err) => `${err.path}: ${err.msg}`)
			.join(", ");
		return next(new AppError(errorMessage, 400));
	}
	next();
};
