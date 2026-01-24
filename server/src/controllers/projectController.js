import ProjectModel from "../models/projectModel.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { cloudinary } from "../utils/cloudinaryConfig.js";
import appError from "../utils/appError.js";
import sendResponse from "../utils/sendResponse.js";
import {
	deleteDoc,
	getAllDocs,
	getDocById,
	updateDoc,
	createDoc,
} from "./handlerFactory.js";

// upload project images
export const uploadProjectImages = catchAsync(async (req, res, next) => {
	// Parse techs if it's a string (from FormData)
	if (typeof req.body.techs === "string") {
		req.body.techs = req.body.techs.split(",").map((t) => t.trim());
	}

	// 1) Cover Image
	if (req.files && req.files.cover && req.files.cover.length > 0) {
		const result = await uploadToCloudinary(req.files.cover[0].buffer, "projects");
		req.body.cover = {
			public_id: result.public_id,
			secure_url: result.secure_url,
		};
	}

	// 2) Gallery Images
	if (req.files && req.files.images && req.files.images.length > 0) {
		const newImages = await Promise.all(
			req.files.images.map(async (file) => {
				const result = await uploadToCloudinary(file.buffer, "projects/gallery");
				return {
					public_id: result.public_id,
					secure_url: result.secure_url,
				};
			})
		);
		req.body.images = newImages;
	}

	next();
});

// add new project
export const createProject = createDoc(ProjectModel, [
	"title",
	"techs",
	"description",
	"liveLink",
	"githubLink",
	"cover",
	"images",
	"isPreferred",
]);

// update project
export const updateProject = updateDoc(ProjectModel, [
	"title",
	"techs",
	"description",
	"liveLink",
	"githubLink",
	"cover",
	"images",
	"isPreferred",
]);

// get project by id
export const getProject = getDocById(ProjectModel);

// delete project by id
export const deleteProject = catchAsync(async (req, res, next) => {
	const project = await ProjectModel.findById(req.params.id);

	if (!project) return next(new appError("Project not found", 404));

	// 1. Delete cover from Cloudinary
	if (project.cover?.public_id) {
		await cloudinary.uploader.destroy(project.cover.public_id);
	}

	// 2. Delete images from Cloudinary
	if (project.images && project.images.length > 0) {
		const deletePromises = project.images.map((img) =>
			cloudinary.uploader.destroy(img.public_id)
		);
		await Promise.all(deletePromises);
	}

	await ProjectModel.findByIdAndDelete(req.params.id);

	sendResponse(res, 200, {});
});

// get all Projects
export const getAllProjects = getAllDocs(ProjectModel);
