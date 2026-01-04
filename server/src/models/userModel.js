import mongoose from "mongoose";
import validator from "validator"
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        min: 3,
        required:[true,"name is required"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "email is required"],
        validate:[validator.isEmail, "please enter the valid email"],
        
    },
    phoneNumber: {
        type: String,
        required: [true, "phone number is required"],
        trim: true,
        validate: [validator.isMobilePhone, "please enter valid phone number"],
            },
    password: {
        type: String,
        trim: true,
        required: [true,"password is required"
        ],
        validate: [validator.isStrongPassword, "please enter strong password"],
    },
    confirmPassword: {
        type: String,
        trim: true,
        required: [true, "confirm password is required"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "passwords are not the same",
        },
    },
    
	role: {
		type: String,
		enum: ["User","Admin"],
		default: "User",
		},
	status: {
		type: String,
		enum: ["active", "deleted"],
		default: "active",
    },
    passwordResetCode: Number,
	passwordResetExpires: Date,
}, { timestamps: true })

// hash password before save or is password modified
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next()
    
    this.password = await bcryptjs.hash(this.password, 12)
    this.confirmPassword = undefined

    next()
})

// create token using jwt
userSchema.methods.createToken = function () {

    return jwt.sign({ _id: this._id }, process.env.JWT_KEY,
        { expiresIn: process.env.JWT_EXPIRES })
    
}

// check if password is correct
userSchema.methods.correctPassword = async function (password, hashPassword) {
    return await bcryptjs.compare(password,hashPassword)
}

// create cookie
userSchema.methods.createCookie = function (res) {
    const token = this.createToken()
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_MODE ==="PRODUCTION" ? true : false,
        sameSite:"strict",
        maxAge: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 *1000)
        
    })
}
export default mongoose.model("UserModel",userSchema)