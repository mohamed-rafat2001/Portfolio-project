import jwt from "jsonwebtoken"
import appError from "../../../E-Commerce/server/utils/appError.js"
import catchAsync from "./catchAsync.js"

export const protect = catchAsync(async(req,res,next) => {
    let token
    // get token from headers or coockies
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    else if (req.cookies.token) token = req.cookies.token
    else {
        return next(new appError("no token", 404));
		
    }

    // veryfication token
    const decode = jwt.decode(token, process.env.JWT_KEY)

    // check user if still exist
	const user = await UserModel.findById(decode._id);

    if (!user)
        return next(
			new appError("the user belong to this token does'nt exist", 400)
		);
    
    req.user = user;
    
	next();
    
})

export const restrictTo = (...roles) => {

    return (req, res, next) => {
        
        if (!roles.includes(req.user.role)) {
            return next(
                        new appError("you don't have permission to perform this action", 400)
                    );
            
        }
            
        next(); 
    }
}
    