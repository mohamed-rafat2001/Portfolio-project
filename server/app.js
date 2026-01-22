import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import appError from "./src/utils/appError.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			process.env.FRONTEND_URL,
		].filter(Boolean),
		credentials: true,
	})
);

// Routers

import authRouter from "./src/routers/authRouter.js";
import userRouter from "./src/routers/userRouter.js";
import projectRouter from "./src/routers/projectRouter.js";
import emailRouter from "./src/routers/emailRouter.js";
import experienceRouter from "./src/routers/experienceRouter.js";
import educationRouter from "./src/routers/educationRouter.js";
import skillRouter from "./src/routers/skillRouter.js";
import analyticsRouter from "./src/routers/analyticsRouter.js";
// use Routers

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/emails", emailRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/educations", educationRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/analytics", analyticsRouter);

app.all("*path", (req, res, next) => {
	next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err,
	});
});

export default app;
