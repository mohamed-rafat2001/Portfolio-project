import UserModel from "../models/userModel.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";
import { cloudinary } from "../utils/cloudinaryConfig.js";

// get user doc
export const getMe = catchAsync(async (req, res, next) => {
	sendResponse(res, 200, req.user);
});

export const getAdminInfo = catchAsync(async (req, res, next) => {
	const admin = await UserModel.findOne({ role: "Admin" }).select(
		"name email phoneNumber moreInfo profileImg"
	);

	if (!admin) return next(new appError("admin not found", 404));

	sendResponse(res, 200, admin);
});

// update user info (basic info)
export const updateMe = catchAsync(async (req, res, next) => {
	const { name, email, phoneNumber } = req.body;

	const updateData = {};
	if (name) updateData.name = name;
	if (email) updateData.email = email;
	if (phoneNumber) updateData.phoneNumber = phoneNumber;

	const user = await UserModel.findByIdAndUpdate(
		req.user._id,
		{ $set: updateData },
		{ runValidators: true, new: true }
	);
	if (!user) return next(new appError("user not updated", 400));
	sendResponse(res, 200, user);
});

// update user nested infos
export const updateInfos = catchAsync(async (req, res, next) => {
	const { moreInfo } = req.body;

	if (!moreInfo) return next(new appError("please provide infos to update", 400));

	const user = await UserModel.findByIdAndUpdate(
		req.user._id,
		{ $set: { moreInfo } },
		{ runValidators: true, new: true }
	);

	if (!user) return next(new appError("user infos not updated", 400));
	sendResponse(res, 200, user);
});

// update profile image
export const profileImg = catchAsync(async (req, res, next) => {
	if (!req.file) return next(new appError("Please upload an image", 400));

	// If user already has an image, delete it from cloudinary
	if (req.user.profileImg?.public_id) {
		await cloudinary.uploader.destroy(req.user.profileImg.public_id);
	}

	const user = await UserModel.findByIdAndUpdate(
		req.user._id,
		{
			profileImg: {
				public_id: req.file.filename,
				secure_url: req.file.path,
			},
		},
		{ runValidators: true, new: true }
	);

	if (!user) return next(new appError("user not updated", 400));
	sendResponse(res, 200, user);
});

// update password
export const updatePassword = catchAsync(async (req, res, next) => {
	const { currentPassword, password, confirmPassword } = req.body;

	if (!currentPassword || !password || !confirmPassword)
		return next(new appError("please provide all fields", 400));

	const user = await UserModel.findById(req.user._id).select("+password");

	if (!(await user.correctPassword(currentPassword, user.password)))
		return next(new appError("current password is wrong", 401));

	user.password = password;
	user.confirmPassword = confirmPassword;
	await user.save();

	user.createCookie(res);
	sendResponse(res, 200, { user });
});
