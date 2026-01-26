import EducationModel from "../models/educationModel.js";
import { catchAsync } from "../middlewares/catchAsyncMiddleware.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const Education = getExport(EducationModel);
const AppError = getExport(appError);
const sendRes = getExport(sendResponse);

import {
	deleteDoc,
	getAllDocs,
	getDocById,
} from "./handlerFactory.js";

// add new Education
export const createEducation = catchAsync(async (req, res, next) => {
	const { institution, degree, description, duration } = req.body;
	const images = [];
	const attachments = [];

	if (req.files) {
		// Handle images
		if (req.files.images) {
			for (const file of req.files.images) {
				const result = await uploadToCloudinary(file.buffer, "education/images");
				images.push({
					public_id: result.public_id,
					secure_url: result.secure_url,
				});
			}
		}

		// Handle attachments
		if (req.files.attachments) {
			for (const file of req.files.attachments) {
				const result = await uploadToCloudinary(file.buffer, "education/attachments");
				attachments.push({
					public_id: result.public_id,
					secure_url: result.secure_url,
					originalName: file.originalname,
				});
			}
		}
	}

	const doc = await Education.create({
		institution,
		degree,
		description,
		duration,
		images,
		attachments,
	});

	if (!doc) return next(new AppError("doc not created", 400));

	sendRes(res, 201, doc);
});

// update Education
export const updateEducation = catchAsync(async (req, res, next) => {
	const { institution, degree, description, duration } = req.body;
	const education = await Education.findById(req.params.id);

	if (!education) return next(new AppError("Education not found", 404));

	const updateData = { institution, degree, description, duration };

	if (req.files) {
		// Handle new images
		if (req.files.images) {
			const newImages = [];
			for (const file of req.files.images) {
				const result = await uploadToCloudinary(file.buffer, "education/images");
				newImages.push({
					public_id: result.public_id,
					secure_url: result.secure_url,
				});
			}
			updateData.images = [...(education.images || []), ...newImages];
		}

		// Handle new attachments
		if (req.files.attachments) {
			const newAttachments = [];
			for (const file of req.files.attachments) {
				const result = await uploadToCloudinary(file.buffer, "education/attachments");
				newAttachments.push({
					public_id: result.public_id,
					secure_url: result.secure_url,
					originalName: file.originalname,
				});
			}
			updateData.attachments = [...(education.attachments || []), ...newAttachments];
		}
	}

	const doc = await Education.findByIdAndUpdate(
		req.params.id,
		{ $set: updateData },
		{ new: true, runValidators: true }
	);

	if (!doc) return next(new AppError("doc not updated", 400));

	sendRes(res, 200, doc);
});

// get Education by id
export const getEducation = getDocById(Education);

// delete Education by id
export const deleteEducation = deleteDoc(Education);

// get all educations
export const getAllEducations = getAllDocs(Education);
