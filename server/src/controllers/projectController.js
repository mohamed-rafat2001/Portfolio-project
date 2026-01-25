import jwt from "jsonwebtoken";
import ProjectModel from "../models/projectModel.js";
import UserModel from "../models/userModel.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { cloudinary } from "../utils/cloudinaryConfig.js";
import appError from "../utils/appError.js";
import sendResponse from "../utils/sendResponse.js";
import {
	getAllDocs,
	getDocById,
	updateDoc,
	createDoc,
} from "./handlerFactory.js";

// upload project images
export const uploadProjectImages = catchAsync(async (req, res, next) => {
	// 1) Main Image
	if (req.files && req.files.mainImg && req.files.mainImg.length > 0) {
		const result = await uploadToCloudinary(req.files.mainImg[0].buffer, "projects");
		req.body.mainImg = {
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
export const deleteProject = catchAsync(async (req, res, next) => {
	const project = await ProjectModel.findById(req.params.id);

	if (!project) return next(new appError("Project not found", 404));

	// 1. Delete mainImg from Cloudinary
	if (project.mainImg?.public_id) {
		await cloudinary.uploader.destroy(project.mainImg.public_id);
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

// increment project views
export const incrementProjectViews = catchAsync(async (req, res, next) => {
    // Check if the request is from an admin (using the token cookie)
    let isAdmin = false;
    const token = req.cookies?.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.USER_KEY_TOKEN);
            const user = await UserModel.findById(decoded._id);
            if (user?.role === "Admin") {
                isAdmin = true;
            }
        } catch {
            // Token invalid or expired, treat as regular visitor
        }
    }

    let project;
    if (isAdmin) {
        // Just return the project without incrementing
        project = await ProjectModel.findById(req.params.id);
    } else {
        // Increment for regular visitors
        project = await ProjectModel.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
    }

	if (!project) return next(new appError("Project not found", 404));

	sendResponse(res, 200, { project });
});

// get all Projects
export const getAllProjects = getAllDocs(ProjectModel);
