import express from "express"
import { login, signUp } from "../controllers/userController.js"

const Router = express.Router()

Router.post("/signup", signUp)
Router.post("/login",login)
// Router.route("/")
//     .post()
//     .get()
//     .patch()
//     .delete()

export default Router