import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const Router = express.Router();
// add protect middleware to all routes
Router.use(protect);
// Router.route("/")
//     .post()
//     .get()
//     .patch()
//     .delete()

export default Router;
