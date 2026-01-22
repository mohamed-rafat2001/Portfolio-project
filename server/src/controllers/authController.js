import UserModel from "../models/userModel.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";
import sendEmail from "../utils/sendEmail.js";

// login func
export const login = catchAsync(async (req, res, next) => {
	const { password, email } = req.body;
	if (!password && !email)
		return next(new appError("please provide valid fields ", 400));

	const user = await UserModel.findOne({ email });

	if (!user) return next(new appError("email or password is wrong", 400));

	const isCorrectPass = await user.correctPassword(password, user.password);

	if (!isCorrectPass)
		return next(new appError("email or password is wrong", 400));

	// create cookie
	user.createCookie(res);

	// send response
	sendResponse(res, 201, { user });
});
// log out func
export const logOut = catchAsync(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id);

	if (!user) return next(new appError("user not found", 404));

	user.removeCookie(res);
	sendResponse(res, 200, {});
});

// forgot password func
export const forgotPassword = catchAsync(async (req, res, next) => {
	const { email } = req.body;
	if (!email) return next(new appError("please provide valid email ", 400));

	const user = await UserModel.findOne({ email });

	if (!user) return next(new appError("user not found", 404));

	// create passwordResetToken
	const resetCode = user.createPasswordResetCode();

	await user.save({ validateBeforeSave: false });

	// sendEmail to user contain the uniqeCode
	if (!resetCode) return next(new appError("something went wrong", 400));

	const Email = sendEmail({
		email: user.email,
		subject: "Reset Password",
		html: passwordResetCodeTemplate(
			resetCode,
			`${user.name} `,
			user.passwordResetExpires
		),
	});
	if (!Email) return next(new appError("email not send", 400));

	sendResponse(res, 200, {});
});

// reset password
export const resetPassword = catchAsync(async (req, res, next) => {
	// get resetCode and password from req.body
	const { resetCode, password, confirmPassword } = req.body;
	// check if resetCode and password are provided
	if (!resetCode || !password || !confirmPassword)
		return next(new appError("please provide all fields", 400));

	// find the user using resetCode
	const user = await UserModel.findOne({
		passwordResetCode: resetCode,
		passwordResetExpires: { $gt: Date.now() },
	});
	if (!user) return next(new appError("invalid reset code", 400));

	// update the user password
	user.password = password;
	user.confirmPassword = confirmPassword;
	user.passwordResetCode = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// create cookie
	user.createCookie(res);

	sendResponse(res, 200, { user });
});
