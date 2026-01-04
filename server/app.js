import express from "express"
const app = express()


// Routers

import userRouter from "./src/routers/userRouter.js"
import projectRouter from "./src/routers/projectRouter.js"
import emailRouter from "./src/routers/emailRouter.js"
// use Routers
app.use("/api/v1/users",userRouter)
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/emails",emailRouter)
export default app