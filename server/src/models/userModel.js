import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

const socialMediaSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		min: 3,
	},
	url: {
		type: String,
		trim: true,
	},
});

const infoDetailsSchema = new mongoose.Schema({
	job: {
		title: {
			type: String,
			trim: true,
			min: 5,
		},
		note: {
			type: String,
			trim: true,
			min: 20,
		},
	},
	aboutMe: {
		title: {
			type: String,
			trim: true,
			min: 5,
		},
		note: {
			type: String,
			trim: true,
			min: 20,
		},
	},
	location: {
		type: String,
		trim: true,
		required: [true, "location is required"],
	},
	available: {
		type: Boolean,
		default: true,
	},
});

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "name is required"],
		},
		email: {
			type: String,
			trim: true,
			required: [true, "email is required"],
			validate: [validator.isEmail, "please enter the valid email"],
		},
		profileImg: {
			public_id: {
				type: String,
				default: null,
			},
			secure_url: {
				type: String,
				default: null,
			},
		},
		phoneNumber: {
			type: String,
			required: [true, "phone number is required"],
			trim: true,
			validate: [validator.isMobilePhone, "please enter valid phone number"],
		},
		socialMedia: [socialMediaSchema],
		moreInfo: infoDetailsSchema,
		password: {
			type: String,
			trim: true,
			required: [true, "password is required"],
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
			enum: ["User", "Admin"],
			default: "User",
		},
		status: {
			type: String,
			enum: ["active", "deleted"],
			default: "active",
		},
		passwordResetCode: Number,
		passwordResetExpires: Date,
	},
	{ timestamps: true }
);

// hash password before save or is password modified
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcryptjs.hash(this.password, 12);
	this.confirmPassword = undefined;

	next();
});

// create token using jwt
userSchema.methods.createToken = function () {
	return jwt.sign({ _id: this._id }, process.env.USER_KEY_TOKEN, {
		expiresIn: "90d",
	});
};

// check if password is correct
userSchema.methods.correctPassword = async function (password, hashPassword) {
	return await bcryptjs.compare(password, hashPassword);
};

// create cookie
userSchema.methods.createCookie = function (res) {
	const token = this.createToken();
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000,
	});
};

// remove cookie
userSchema.methods.removeCookie = function (res) {
	res.cookie("token", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 0,
	});
};

// create passwordResetToken
userSchema.methods.createPasswordResetCode = function () {
	const buffer = crypto.randomBytes(6);
	let code = "";

	for (let i = 0; i < 6; i++) {
		code += (buffer[i] % 10).toString();
	}
	this.passwordResetCode = code;
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	return code;
};

export default mongoose.model("UserModel", userSchema);
