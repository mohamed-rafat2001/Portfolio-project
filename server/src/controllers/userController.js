import UserModel from "../models/userModel.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";

// get user doc
export const getMe = catchAsync(async (req, res, next) => {
	sendResponse(res, 200, req.user);
});
export const getAdminInfo = catchAsync(async (req, res, next) => {
	const admin = await UserModel.findOne({ role: "Admin" }).select(
		"name",
		"email",
		"phoneNumber",
		"profileImg",
		"aboutMe",
		"socialMedia"
	);

	if (!admin) return next(new appError("admin not found", 404));

	sendResponse(res, 200, admin);
});
// update user info
export const updateMe = catchAsync(async (req, res, next) => {
	const { name, email, phoneNumber, aboutMe, location } = req.body;
	const user = await UserModel.findByIdAndUpdate(
		req.user._id,
		{ name, email, phoneNumber, aboutMe, location },
		{ runValidators: true, new: true }
	);
	if (!user) return next(new appError("user not updated", 400));
	sendResponse(res, 200, user);
});

// update profile image
export const profileImg = catchAsync(async (req, res, next) => {
	const { profileImg } = req.body;
	const user = await UserModel.findByIdAndUpdate(
		req.user._id,
		{ profileImg },
		{ runValidators: true, new: true }
	);

	if (!user) return next(new appError("profile image not updated", 400));

	sendResponse(res, 200, user);
});
// update password
export const updatePassword = catchAsync(async (req, res, next) => {
	const { newPassword, currentPassword, confirmPassword } = req.body;

	// check if newPassword, currentPassword, confirmPassword are provided
	if (!newPassword || !currentPassword || !confirmPassword)
		return next(new appError("please provide all fields", 400));

	const user = await UserModel.findById(req.user._id);
	const isPasswordCorrect = await user.correctPassword(
		currentPassword,
		user.password
	);

	// check if password is correct
	if (!user || !isPasswordCorrect)
		return next(new appError("invalid credentials", 400));

	// update the password
	user.password = newPassword;
	user.confirmPassword = confirmPassword;
	await user.save();

	// create token & cookie
	const token = user.CreateToken();
	user.createCookie(res);

	sendResponse(res, 200, { user, token });
});
