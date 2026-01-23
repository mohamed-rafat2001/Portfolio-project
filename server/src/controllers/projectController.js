import ProjectModel from "../models/projectModel.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";
import { cloudinary } from "../utils/cloudinaryConfig.js";
import {
	deleteDoc,
	getAllDocs,
	getDocById,
} from "./handlerFactory.js";

// add new project
export const createProject = catchAsync(async (req, res, next) => {
	const { title, description, liveLink, githubLink, techs } = req.body;

	if (!req.files || !req.files.cover) {
		return next(new appError("Please upload a project cover image", 400));
	}

	// 1. Upload cover
	const cover = {
		public_id: req.files.cover[0].filename,
		secure_url: req.files.cover[0].path,
	};

	// 2. Upload images (optional)
	const images = [];
	if (req.files.images) {
		req.files.images.forEach((file) => {
			images.push({
				public_id: file.filename,
				secure_url: file.path,
			});
		});
	}

	const doc = await ProjectModel.create({
		title,
		description,
		liveLink,
		githubLink,
		techs: techs ? JSON.parse(techs) : [],
		cover,
		images,
	});

	if (!doc) return next(new appError("doc not created", 400));

	sendResponse(res, 201, doc);
});

// update project
export const updateProject = catchAsync(async (req, res, next) => {
	const { title, description, liveLink, githubLink, techs } = req.body;
	const project = await ProjectModel.findById(req.params.id);

	if (!project) return next(new appError("Project not found", 404));

	const updateData = {
		title,
		description,
		liveLink,
		githubLink,
		techs: techs ? JSON.parse(techs) : project.techs,
	};

	// Update cover if provided
	if (req.files && req.files.cover) {
		// Delete old cover
		if (project.cover?.public_id) {
			await cloudinary.uploader.destroy(project.cover.public_id);
		}
		updateData.cover = {
			public_id: req.files.cover[0].filename,
			secure_url: req.files.cover[0].path,
		};
	}

	// Update images if provided (this will replace old images)
	if (req.files && req.files.images) {
		// Delete old images
		if (project.images && project.images.length > 0) {
			const deletePromises = project.images.map((img) =>
				cloudinary.uploader.destroy(img.public_id)
			);
			await Promise.all(deletePromises);
		}

		updateData.images = req.files.images.map((file) => ({
			public_id: file.filename,
			secure_url: file.path,
		}));
	}

	const doc = await ProjectModel.findByIdAndUpdate(req.params.id, updateData, {
		new: true,
		runValidators: true,
	});

	if (!doc) return next(new appError("doc not updated", 400));

	sendResponse(res, 200, doc);
});

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

