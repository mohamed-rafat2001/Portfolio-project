import jwt from "jsonwebtoken";
import appError from "../utils/appError.js";
import { catchAsync } from "./catchAsyncMiddleware.js";
import UserModel from "../models/userModel.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const User = getExport(UserModel);
const AppError = getExport(appError);
// Handle jwt import which might be CJS
const jwtLib = getExport(jwt);

export const protect = catchAsync(async (req, res, next) => {
	let token;

	// 1) Get token from cookies
	if (req.cookies && req.cookies.token) {
		token = req.cookies.token;
	} 
	// 2) Fallback: Get token from Authorization header (Bearer token)
	else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return next(new AppError("Not authorized to access this route", 401));
	}

	// verification token
	const decode = jwtLib.verify(token, process.env.USER_KEY_TOKEN);

	// check user if still exist
	const user = await User.findById(decode._id);

	if (!user)
		return next(
			new AppError("the user belong to this token does'nt exist", 401)
		);

	req.user = user;

	next();
});

export const restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError("you don't have permission to perform this action", 400)
			);
		}

		next();
	};
};
