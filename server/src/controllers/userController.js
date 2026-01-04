import UserModel from "../models/userModel.js"
import catchAsync from "../middlewares/catchAsyncMiddleware.js"
import sendResponse from "../utils/sendResponse.js"
import appError from "../utils/appError.js"

// sign up func
export const signUp = catchAsync(
    async (req, res, next) => {
        
        const { name, email, phoneNumber, password, confirmPassword } = req.body
        const user = new UserModel({
            name,
            email,
            phoneNumber,
            password,
            confirmPassword,
            role:"User"
        })

        //  check if user created
        if (!user) return next(new appError("user didn't create", 400))
        
        // create token && cookie
        const token = user.createToken()
        user.createCookie(res)

        // save user && send response
        await user.save()
        sendResponse(res,201,{user,token})
    }
)

// login func
export const login = catchAsync(
    async (req, res, next) => {
        const { password, email } = req.body
        if (!password && !email) return next(new appError("please provide valid fields "))
        
        const user = await UserModel.findOne({ email })
        
        if (!user) return next(new appError("email or password is wrong"))
        
        const isCorrectPass = await user.correctPassword(password, user.password)

        if (!isCorrectPass) return next(new appError("email or password is wrong"))
        
         // create token && cookie
        const token = user.createToken()
        user.createCookie(res)

        // send response
        sendResponse(res,201,{user,token})
        
    }
)