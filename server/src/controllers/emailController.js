import EmailModel from "../models/emailModel.js";
import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
} from "./handlerFactory.js";

import { catchAsync } from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import appError from "../utils/appError.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const Email = getExport(EmailModel);
const AppError = getExport(appError);
const sendRes = getExport(sendResponse);

// add new email
export const createEmail = createDoc(Email, [
	"userName",
	"userEmail",
	"phoneNumber",
	"subject",
	"emailBody",
]);

// get email by id
export const getEmail = getDocById(Email);

// delete email by id
export const deleteEmail = deleteDoc(Email);

// get all emails
export const getAllEmails = getAllDocs(Email);

// update email read status
export const updateEmailStatus = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { read } = req.body;

	const email = await Email.findByIdAndUpdate(
		id,
		{ read },
		{ new: true, runValidators: true }
	);

	if (!email) return next(new AppError("Email not found", 404));

	sendRes(res, 200, email);
});
