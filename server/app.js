import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import rateLimit from "express-rate-limit";

const app = express();

// Global Middlewares

// CORS Configuration
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:5173",
		credentials: true,
	})
);

// Security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
	max: 100,
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

// Routers
import authRouter from "./src/routers/authRouter.js";
import userRouter from "./src/routers/userRouter.js";
import projectRouter from "./src/routers/projectRouter.js";
import emailRouter from "./src/routers/emailRouter.js";
import experienceRouter from "./src/routers/experienceRouter.js";
import educationRouter from "./src/routers/educationRouter.js";
import skillRouter from "./src/routers/skillRouter.js";
import visitorRouter from "./src/routers/visitorRouter.js";
import globalErrorHandler from "./src/controllers/errorController.js";
import appError from "./src/utils/appError.js";

// use Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/emails", emailRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/educations", educationRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/visitors", visitorRouter);

app.all(/(.*)/, (req, res, next) => {
	next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
