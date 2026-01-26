import VisitorModel from "../models/visitorModel.js";
import { catchAsync } from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const Visitor = getExport(VisitorModel);
const sendRes = getExport(sendResponse);

import { getAllDocs, deleteDoc } from "./handlerFactory.js";

// track visitor
export const trackVisitor = catchAsync(async (req, res, _next) => {
	const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	const userAgent = req.headers["user-agent"];

	await Visitor.create({
		ip,
		userAgent,
	});

	sendRes(res, 200, { message: "Visitor tracked" });
});

// get all visitors
export const getAllVisitors = getAllDocs(Visitor);

// delete visitor
export const deleteVisitor = deleteDoc(Visitor);
