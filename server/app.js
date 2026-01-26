import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

// Import Routers
import authRouter from "./src/routers/authRouter.js";
import userRouter from "./src/routers/userRouter.js";
import projectRouter from "./src/routers/projectRouter.js";
import emailRouter from "./src/routers/emailRouter.js";
import experienceRouter from "./src/routers/experienceRouter.js";
import educationRouter from "./src/routers/educationRouter.js";
import skillRouter from "./src/routers/skillRouter.js";
import visitorRouter from "./src/routers/visitorRouter.js";
import analyticsRouter from "./src/routers/analyticsRouter.js";

// Error Handling
import globalErrorHandler from "./src/controllers/errorController.js";
import appError from "./src/utils/appError.js";

// Helper to get the actual function from a module (handles ESM/CJS interop)
const getFunction = (mod) => {
	if (typeof mod === "function") return mod;
	if (mod && typeof mod.default === "function") return mod.default;
	return mod;
};

// Initialize express app with interop handling
const expressFunc = getFunction(express);
const app = expressFunc();

// Global Middlewares

// CORS Configuration
const allowedOrigins = [
	"http://localhost:5173",
	"https://mohamed-rafat-portfolio.netlify.app",
];

app.use(
	getFunction(cors)({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("CORS Policy Error"));
			}
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
		optionsSuccessStatus: 200,
	})
);

// Security HTTP headers
app.use(getFunction(helmet)());

// Limit requests from same API
const limiter = getFunction(rateLimit)({
	max: 5000,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
// Use expressFunc for json and urlencoded to ensure we use the correct lib
app.use(expressFunc.json({ limit: "10kb" }));
app.use(expressFunc.urlencoded({ extended: true, limit: "10kb" }));
app.use(getFunction(cookieParser)());

// Data sanitization against NoSQL query injection
app.use(getFunction(mongoSanitize)());

// Prevent parameter pollution
app.use(getFunction(hpp)());

// Use Routers
app.use("/api/v1/auth", getFunction(authRouter));
app.use("/api/v1/users", getFunction(userRouter));
app.use("/api/v1/projects", getFunction(projectRouter));
app.use("/api/v1/emails", getFunction(emailRouter));
app.use("/api/v1/experiences", getFunction(experienceRouter));
app.use("/api/v1/educations", getFunction(educationRouter));
app.use("/api/v1/skills", getFunction(skillRouter));
app.use("/api/v1/visitors", getFunction(visitorRouter));
app.use("/api/v1/analytics", getFunction(analyticsRouter));

// 404 Handler
app.use((req, res, next) => {
    // Manually handle AppError here to avoid import issues
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.statusCode = 404;
    err.status = 'fail';
    err.isOperational = true;
	next(err);
});

// Global Error Handler
app.use(getFunction(globalErrorHandler));

export { app };
export default app;
