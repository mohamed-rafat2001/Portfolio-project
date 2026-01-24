import EmailModel from "../models/emailModel.js";
import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
} from "./handlerFactory.js";

import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";

// add new email
export const createEmail = createDoc(EmailModel, [
	"userName",
	"userEmail",
	"phoneNumber",
	"subject",
	"emailBody",
]);

// get email by id
export const getEmail = getDocById(EmailModel);

// delete email by id
export const deleteEmail = deleteDoc(EmailModel);

// get all emails
export const getAllEmails = getAllDocs(EmailModel);

// update email read status
export const updateEmailStatus = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { read } = req.body;

	const email = await EmailModel.findByIdAndUpdate(
		id,
		{ read },
		{ new: true, runValidators: true }
	);

	if (!email) return next(new appError("Email not found", 404));

	sendResponse(res, 200, email);
});
