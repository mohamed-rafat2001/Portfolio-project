import Visitor from "../models/visitorModel.js";
import catchAsync from "../middlewares/catchAsyncMiddleware.js";
import sendResponse from "../utils/sendResponse.js";

export const trackVisit = catchAsync(async (req, res, _next) => {
	// Check if user is logged in (only via token in cookies)
	const token = req.cookies?.token;

	// If token exists, assume it's a registered/logged-in user and don't track as a visitor
	if (token) {
		return sendResponse(res, 200, "Visit not tracked (logged-in user)");
	}

	// Simple visit tracking for anonymous visitors
	await Visitor.create({
		ip: req.ip,
		userAgent: req.headers["user-agent"],
	});

	sendResponse(res, 200, "Visit tracked");
});

export const getStats = catchAsync(async (req, res, _next) => {
	const now = new Date();
	const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	const monthStart = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
	const yearStart = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

	const [todayCount, weekCount, monthCount, yearCount, totalCount] = await Promise.all([
		Visitor.countDocuments({ timestamp: { $gte: todayStart } }),
		Visitor.countDocuments({ timestamp: { $gte: weekStart } }),
		Visitor.countDocuments({ timestamp: { $gte: monthStart } }),
		Visitor.countDocuments({ timestamp: { $gte: yearStart } }),
		Visitor.countDocuments({}),
	]);

	// Get chart data (last 7 days)
	const chartData = [];
	for (let i = 6; i >= 0; i--) {
		const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
		const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

		const count = await Visitor.countDocuments({
			timestamp: { $gte: startOfDay, $lte: endOfDay },
		});

		chartData.push({
			name: startOfDay.toLocaleDateString("en-US", { weekday: "short" }),
			visits: count,
		});
	}

	sendResponse(res, 200, {
		todayCount,
		weekCount,
		monthCount,
		yearCount,
		totalCount,
		chartData,
	});
});
