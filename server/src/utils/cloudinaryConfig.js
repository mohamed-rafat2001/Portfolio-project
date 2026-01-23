import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: async (req, file) => {
		let folder = "portfolio/others";
		if (req.originalUrl.includes("users")) {
			folder = "portfolio/users";
		} else if (req.originalUrl.includes("projects")) {
			folder = "portfolio/projects";
		}

		return {
			folder: folder,
			allowed_formats: ["jpg", "png", "jpeg", "webp"],
			public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
		};
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new Error("Not an image! Please upload only images."), false);
	}
};

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5MB limit
	},
});

export { cloudinary, upload };
