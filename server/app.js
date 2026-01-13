import express from "express";
const app = express();

// Routers

import authRouter from "./src/routers/authRouter.js";
import userRouter from "./src/routers/userRouter.js";
import projectRouter from "./src/routers/projectRouter.js";
import emailRouter from "./src/routers/emailRouter.js";
import experienceRouter from "./src/routers/experienceRouter.js";
import educationRouter from "./src/routers/educationRouter.js";
import skillRouter from "./src/routers/skillRouter.js";
// use Routers

app.use("api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/emails", emailRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/educations", educationRouter);
app.use("/api/v1/skills", skillRouter);

export default app;
