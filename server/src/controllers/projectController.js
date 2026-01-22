import ProjectModel from "../models/projectModel.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
	updateDoc,
} from "./handlerFactory.js";

// upload project images
export const uploadProjectImages = catchAsync(async (req, res, next) => {
	// Parse JSON fields from FormData
	if (typeof req.body.techStack === "string") {
		req.body.techStack = JSON.parse(req.body.techStack);
	}
	if (typeof req.body.existingImages === "string") {
		req.body.existingImages = JSON.parse(req.body.existingImages);
	}

	// 1) Main Image
	if (req.files && req.files.mainImg && req.files.mainImg.length > 0) {
		const result = await uploadToCloudinary(req.files.mainImg[0].buffer, "projects");
		req.body.mainImg = {
			public_id: result.public_id,
			secure_url: result.secure_url,
		};
	}

	// 2) Gallery Images
	let galleryImages = req.body.existingImages || [];
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
		galleryImages = [...galleryImages, ...newImages];
	}
	
	if ((req.files && req.files.images && req.files.images.length > 0) || req.body.existingImages) {
		req.body.images = galleryImages;
	}

	next();
});

// add new project
export const createProject = createDoc(ProjectModel, [
	"title",
	"techStack",
	"description",
	"liveUrl",
	"repoUrl",
	"mainImg",
	"images",
	"isPreferred",
]);

// update project
export const updateProject = updateDoc(ProjectModel, [
	"title",
	"techStack",
	"description",
	"liveUrl",
	"repoUrl",
	"mainImg",
	"images",
	"isPreferred",
]);

// get project by id
export const getProject = getDocById(ProjectModel);

// delete project by id
export const deleteProject = deleteDoc(ProjectModel);

// get all Projects
export const getAllProjects = catchAsync(async (req, res, next) => {
	// 1) Filtering
	const queryObj = { ...req.query };
	const excludedFields = ["page", "sort", "limit", "fields"];
	excludedFields.forEach((el) => delete queryObj[el]);

	// 2) Sorting - Always prioritize isPreferred, then by createdAt or user-specified sort
	let query = ProjectModel.find(queryObj);
	
	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(`-isPreferred ${sortBy}`);
	} else {
		query = query.sort("-isPreferred -createdAt");
	}

	// 3) Pagination
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	query = query.skip(skip).limit(limit);

	const docs = await query;
	const totalResults = await ProjectModel.countDocuments(queryObj);

	if (!docs) return next(new appError("no docs found", 404));

	res.status(200).json({
		status: "success",
		results: docs.length,
		totalResults,
		data: docs,
	});
});
