import UserModel from "../models/userModel.js";
import { catchAsync } from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";
import { cloudinary } from "../utils/cloudinaryConfig.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const User = getExport(UserModel);
const AppError = getExport(appError);
const sendRes = getExport(sendResponse);

// get user doc
export const getMe = catchAsync(async (req, res, _next) => {
	sendRes(res, 200, { data: req.user });
});

export const getAdminInfo = catchAsync(async (req, res, next) => {
	const admin = await User.findOne({ role: "Admin" }).select(
		"name email phoneNumber location aboutMe infos profileImg socialMedia"
	);

	if (!admin) return next(new AppError("admin not found", 404));

	sendRes(res, 200, admin);
});

// update user info (basic info)
export const updateMe = catchAsync(async (req, res, next) => {
	const { 
        name, 
        email, 
        phoneNumber, 
        location, 
        aboutMe, 
        socialMedia, 
        infos,
        password,
        confirmPassword,
        passwordCurrent 
    } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!user) return next(new AppError("user not found", 404));

    // If password update is requested (check if the password field actually has content)
    const isPasswordUpdate = password && typeof password === 'string' && password.trim().length > 0;

    if (isPasswordUpdate) {
        if (!passwordCurrent || !confirmPassword) {
            return next(new AppError("please provide current password and confirmation", 400));
        }
        
        // Use your method to check if the current password is correct
        if (!(await user.correctPassword(passwordCurrent, user.password))) {
            return next(new AppError("current password is wrong", 401));
        }
        
        user.password = password;
        user.confirmPassword = confirmPassword;
    }

	if (name) user.name = name;
	if (email) user.email = email;
	if (phoneNumber) user.phoneNumber = phoneNumber;
	if (location) user.location = location;
	if (aboutMe) user.aboutMe = aboutMe;
    if (socialMedia) user.socialMedia = socialMedia;
    if (infos) user.infos = infos;

    await user.save();
    
    // Hide password for response
    user.password = undefined;

	sendRes(res, 200, user);
});

// update user nested infos
export const updateInfos = catchAsync(async (req, res, next) => {
	const { infos } = req.body;

	if (!infos) return next(new AppError("please provide infos to update", 400));

	const user = await User.findByIdAndUpdate(
		req.user._id,
		{ $set: { infos } },
		{ runValidators: true, new: true }
	);

	if (!user) return next(new AppError("user infos not updated", 400));
	sendRes(res, 200, user);
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
	const { passwordCurrent, password, confirmPassword } = req.body;

	if (!passwordCurrent || !password || !confirmPassword)
		return next(new appError("please provide all fields", 400));

	const user = await UserModel.findById(req.user._id).select("+password");

	if (!(await user.correctPassword(passwordCurrent, user.password)))
		return next(new appError("current password is wrong", 401));

	user.password = password;
	user.confirmPassword = confirmPassword;
	await user.save();

	user.createCookie(res);
	sendResponse(res, 200, { user });
});
