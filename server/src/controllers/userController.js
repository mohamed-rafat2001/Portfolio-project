import UserModel from "../models/userModel.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";
import { uploadToCloudinary, removeFromCloudinary } from "../utils/cloudinary.js";

// get user doc
export const getMe = catchAsync(async (req, res, next) => {
	sendResponse(res, 200, req.user);
});
export const getAdminInfo = catchAsync(async (req, res, next) => {
	const admin = await UserModel.findOne({ role: "Admin" }).select(
		"name email phoneNumber infos"
	);

	if (!admin) return next(new appError("admin not found", 404));

	sendResponse(res, 200, admin);
});
// update user info (basic info)
export const updateMe = catchAsync(async (req, res, next) => {
	const { name, email, phoneNumber, available } = req.body;

	const updateData = {};
	if (name) updateData.name = name;
	if (email) updateData.email = email;
	if (phoneNumber) updateData.phoneNumber = phoneNumber;
	if (available !== undefined) updateData["infos.available"] = available;

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
	const { infos } = req.body;

	if (!infos) return next(new appError("please provide infos to update", 400));

	const updateData = {};
	if (infos.location) updateData["infos.location"] = infos.location;
	if (infos.job) {
		if (infos.job.title) updateData["infos.job.title"] = infos.job.title;
		if (infos.job.note) updateData["infos.job.note"] = infos.job.note;
	}
	if (infos.aboutMe) {
		if (infos.aboutMe.title) updateData["infos.aboutMe.title"] = infos.aboutMe.title;
		if (infos.aboutMe.message) updateData["infos.aboutMe.message"] = infos.aboutMe.message;
	}
	if (infos.socialMedia) updateData["infos.socialMedia"] = infos.socialMedia;

	const user = await UserModel.findByIdAndUpdate(
		req.user._id,
		{ $set: updateData },
		{ runValidators: true, new: true }
	);

	if (!user) return next(new appError("user infos not updated", 400));
	sendResponse(res, 200, user);
});

// update profile image
export const profileImg = catchAsync(async (req, res, next) => {
	if (!req.file) return next(new appError("please upload an image", 400));

	const user = await UserModel.findById(req.user._id);
	if (!user) return next(new appError("user not found", 404));

	// 1) Upload new image to cloudinary
	const result = await uploadToCloudinary(req.file.buffer, "avatars");

	// 2) If user has an old image (and it's not the default), delete it from cloudinary
	if (user.infos?.profileImg?.public_id && user.infos.profileImg.public_id !== "avatars/default_avatar") {
		await removeFromCloudinary(user.infos.profileImg.public_id);
	}

	// 3) Update user profileImg field
	if (!user.infos) user.infos = {};
	user.infos.profileImg = {
		public_id: result.public_id,
		secure_url: result.secure_url,
	};

	await user.save({ validateBeforeSave: false });

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
