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

const app = express();

// Global Middlewares

// CORS Configuration
const allowedOrigins = [
	"http://localhost:5173",
	"https://mohamed-rafat-portfolio.netlify.app",
];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("CORS Error: Origin not allowed"));
			}
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
	})
);

// Security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
	max: 5000,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// Use Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/emails", emailRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/educations", educationRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/visitors", visitorRouter);
app.use("/api/v1/analytics", analyticsRouter);

// 404 Handler
app.use((req, res, next) => {
	next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
