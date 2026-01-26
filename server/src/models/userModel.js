import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

// Handle potential ESM/CJS interop issues
const getLib = (mod) => (mod && mod.default ? mod.default : mod);
const bcryptLib = getLib(bcryptjs);
const jwtLib = getLib(jwt);

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
		message: {
			type: String,
			trim: true,
			min: 20,
		},
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
		location: {
			type: String,
			trim: true,
			required: [true, "location is required"],
		},
		aboutMe: {
			type: String,
			trim: true,
		},
		socialMedia: [socialMediaSchema],
		infos: infoDetailsSchema,
		password: {
			type: String,
			trim: true,
			required: [true, "password is required"],
			validate: [validator.isStrongPassword, "please enter strong password"],
		},
		confirmPassword: {
			type: String,
			trim: true,
			required: [
				function () {
					return this.isModified("password");
				},
				"confirm password is required",
			],
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

	this.password = await bcryptLib.hash(this.password, 12);
	this.confirmPassword = undefined;

	next();
});

// create token using jwt
userSchema.methods.createToken = function () {
	return jwtLib.sign({ _id: this._id }, process.env.USER_KEY_TOKEN, {
		expiresIn: "90d",
	});
};

// check if password is correct
userSchema.methods.correctPassword = async function (password, hashPassword) {
	return await bcryptLib.compare(password, hashPassword);
};

// create cookie
userSchema.methods.createCookie = function (res, providedToken) {
	const token = providedToken || this.createToken();
	const isProd = process.env.NODE_ENV === "production" || process.env.NODE_MODE === "production" || process.env.NETLIFY === "true";
	
	const cookieOptions = {
		httpOnly: true,
		secure: isProd, // Must be true for sameSite: "none"
		sameSite: isProd ? "none" : "lax",
		maxAge: (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000,
	};

	res.cookie("token", token, cookieOptions);
};

// remove cookie
userSchema.methods.removeCookie = function (res) {
	const isProd = process.env.NODE_ENV === "production" || process.env.NODE_MODE === "production" || process.env.NETLIFY === "true";
	
	const cookieOptions = {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? "none" : "lax",
		maxAge: 0,
	};

	res.cookie("token", "", cookieOptions);
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
