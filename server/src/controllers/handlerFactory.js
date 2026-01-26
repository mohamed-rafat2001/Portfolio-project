import { catchAsync } from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";
import validationBody from "../utils/validationBody.js";
import APIFeatures from "../utils/apiFeatures.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const AppError = getExport(appError);
const Features = getExport(APIFeatures);
const sendRes = getExport(sendResponse);

// Helper to ensure we have the actual Mongoose Model
const getModel = (Model) => getExport(Model);

// create doc
export const createDoc = (Model, fields = []) =>
	catchAsync(async (req, res, next) => {
		let object;
        const M = getModel(Model);

		if (fields.length != 0) {
			object = validationBody(req.body, fields);
			if (!object || Object.keys(object).length === 0)
				return next(new AppError("please provide valid fields to update", 400));
		}
		const doc = await M.create({ ...object });

		if (!doc) return next(new AppError("doc not created", 400));

		sendRes(res, 201, doc);
	});
// update doc
export const updateDoc = (Model, fields = []) =>
	catchAsync(async (req, res, next) => {
		let object;
        const M = getModel(Model);

		if (fields.length != 0) {
			object = validationBody(req.body, fields);
			if (!object || Object.keys(object).length === 0)
				return next(new AppError("please provide valid fields to update", 400));
		}
		const doc = await M.findByIdAndUpdate(
			req.params.id,
			{ ...object },
			{ new: true, runValidators: true }
		);

		if (!doc) return next(new AppError("doc not updated", 400));

		sendRes(res, 200, doc);
	});

// get by id param
export const getDocById = (Model) =>
	catchAsync(async (req, res, next) => {
        const M = getModel(Model);
		const doc = await M.findById(req.params.id);

		if (!doc) return next(new AppError("doc not found", 400));

		let modelName = M.modelName;
		if (modelName.endsWith("Model")) modelName = modelName.slice(0, -5);
		modelName = modelName.toLowerCase();

		const responseData = { [modelName]: doc };
		sendRes(res, 200, responseData);
	});

// delete doc
export const deleteDoc = (Model) =>
	catchAsync(async (req, res, next) => {
        const M = getModel(Model);
		const doc = await M.findByIdAndDelete(req.params.id);

		if (!doc) return next(new AppError("doc not deleted", 400));

		sendRes(res, 200, {});
	});

// get all docs
export const getAllDocs = (Model) =>
	catchAsync(async (req, res, next) => {
        const M = getModel(Model);
		// Build query
		const features = new Features(M.find(), req.query)
			.filter()
			.sort()
			.limitFields();

		// Get total results with filters applied (before pagination)
		const totalResults = await M.countDocuments(features.query.getFilter());

		// Apply pagination
		features.paginate();

		const docs = await features.query;

		if (!docs) return next(new AppError("no docs found", 404));

		// Get the model name in lowercase plural form
		let modelName = M.modelName; 
		if (modelName.endsWith("Model")) {
			modelName = modelName.slice(0, -5);
		}
		
		// Handle confusing naming like "SkillsModel" which pluralizes to "skillss"
		if (modelName.endsWith("s")) {
			// If it already ends in s (like Skills), just lowercase it
			modelName = modelName.toLowerCase();
		} else {
			// Otherwise append s
			modelName = modelName.toLowerCase() + 's';
		}

		const responseData = { [modelName]: docs, totalResults };
		sendRes(res, 200, responseData);
	});
