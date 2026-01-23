import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";
import validationBody from "../utils/validationBody.js";

// create doc
export const createDoc = (Model, fields = []) =>
	catchAsync(async (req, res, next) => {
		let object;

		if (fields.length != 0) {
			object = validationBody(req.body, fields);
			if (!object || Object.keys(object).length === 0)
				return next(new appError("please provide valid fields to update", 400));
		}
		const doc = await Model.create({ ...object });

		if (!doc) return next(new appError("doc not created", 400));

		sendResponse(res, 201, doc);
	});
// update doc
export const updateDoc = (Model, fields = []) =>
	catchAsync(async (req, res, next) => {
		let object;

		if (fields.length != 0) {
			object = validationBody(req.body, fields);
			if (!object || Object.keys(object).length === 0)
				return next(new appError("please provide valid fields to update", 400));
		}
		const doc = await Model.findByIdAndUpdate(
			req.params.id,
			{ ...object },
			{ new: true, runValidators: true }
		);

		if (!doc) return next(new appError("doc not updated", 400));

		sendResponse(res, 200, doc);
	});

// get by id param
export const getDocById = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findById(req.params.id);

		if (!doc) return next(new appError("doc not found", 400));

		sendResponse(res, 201, doc);
	});

// delete doc
export const deleteDoc = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) return next(new appError("doc not deleted", 400));

		sendResponse(res, 200, {});
	});

// get all docs
export const getAllDocs = (Model) =>
	catchAsync(async (req, res, next) => {
		const docs = await Model.find({});

		if (!docs) return next(new appError("no docs found", 404));

		sendResponse(res, 200, docs);
	});
