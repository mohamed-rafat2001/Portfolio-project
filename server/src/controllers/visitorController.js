import VisitorModel from "../models/visitorModel.js";
import { catchAsync } from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";
import { getAllDocs, deleteDoc } from "./handlerFactory.js";

// track visitor
export const trackVisitor = catchAsync(async (req, res, _next) => {
	const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	const userAgent = req.headers["user-agent"];

	await VisitorModel.create({
		ip,
		userAgent,
	});

	sendResponse(res, 200, { message: "Visitor tracked" });
});

// get all visitors
export const getAllVisitors = getAllDocs(VisitorModel);

// delete visitor
export const deleteVisitor = deleteDoc(VisitorModel);
