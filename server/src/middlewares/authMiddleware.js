import jwt from "jsonwebtoken";
import appError from "../utils/appError.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import UserModel from "../models/userModel.js";

export const protect = catchAsync(async (req, res, next) => {
	let token;
	// get token only from cookies
	if (req.cookies && req.cookies.token) {
		token = req.cookies.token;
	}

	if (!token) {
		return next(new appError("no token", 401));
	}

	// veryfication token
	const decode = jwt.verify(token, process.env.JWT_KEY);

	// check user if still exist
	const user = await UserModel.findById(decode._id);

	if (!user)
		return next(
			new appError("the user belong to this token does'nt exist", 401)
		);

	req.user = user;

	next();
});

export const restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new appError("you don't have permission to perform this action", 400)
			);
		}

		next();
	};
};
