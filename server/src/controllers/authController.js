import UserModel from "../models/userModel.js";
import { catchAsync } from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";
import sendEmail from "../utils/sendEmail.js";
import { passwordResetCodeTemplate } from "../utils/emailTemplates.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const User = getExport(UserModel);
const AppError = getExport(appError);
const sendRes = getExport(sendResponse);

// login func
export const login = catchAsync(async (req, res, next) => {
	const { password, email } = req.body;
	if (!password || !email)
		return next(new AppError("please provide valid email and password", 400));

	const user = await User.findOne({ email });

	if (!user) return next(new AppError("email or password is wrong", 400));

	const isCorrectPass = await user.correctPassword(password, user.password);

	if (!isCorrectPass)
		return next(new AppError("email or password is wrong", 400));

	// create cookie
	const token = user.createToken();
	user.createCookie(res, token);

	// Remove password from output
	user.password = undefined;

	// send response
	sendRes(res, 201, { 
		user,
		token // Also send token in body for potential fallback
	});
});

// log out func
export const logOut = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id);

	if (!user) return next(new AppError("user not found", 404));

	user.removeCookie(res);
	sendRes(res, 200, {});
});

// forgot password func
export const forgotPassword = catchAsync(async (req, res, next) => {
	const { email } = req.body;
	if (!email) return next(new AppError("please provide valid email ", 400));

	const user = await User.findOne({ email });

	if (!user) return next(new AppError("user not found", 404));

	// create passwordResetToken
	const resetCode = user.createPasswordResetCode();

	await user.save({ validateBeforeSave: false });

	// sendEmail to user contain the uniqeCode
	if (!resetCode) return next(new AppError("something went wrong", 400));

	const Email = sendEmail({
		email: user.email,
		subject: "Reset Password",
		html: passwordResetCodeTemplate(
			resetCode,
			`${user.name} `,
			user.passwordResetExpires
		),
	});
	if (!Email) return next(new AppError("email not send", 400));

	sendRes(res, 200, {});
});

// reset password func
export const resetPassword = catchAsync(async (req, res, next) => {
	const { email, resetCode, password, confirmPassword } = req.body;

	if (!email || !resetCode || !password || !confirmPassword)
		return next(new AppError("please provide all fields", 400));

	const user = await User.findOne({
		email,
		passwordResetCode: resetCode,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) return next(new AppError("invalid or expired reset code", 400));

	user.password = password;
	user.confirmPassword = confirmPassword;
	user.passwordResetCode = undefined;
	user.passwordResetExpires = undefined;

	await user.save();

	const token = user.createToken();
	user.createCookie(res, token);
	
	// Remove password from output
	user.password = undefined;

	sendRes(res, 200, { 
		user,
		token 
	});
});
