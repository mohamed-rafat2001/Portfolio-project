import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret,
	secure: true,
});

export const uploadToCloudinary = async (fileBuffer, folder = "general") => {
	const rootFolder = "Portfolio-app";
	const fullPath = `${rootFolder}/${folder}`;

	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder: fullPath,
				resource_type: "auto",
			},
			(error, result) => {
				if (error) return reject(error);
				resolve(result);
			}
		);

		uploadStream.end(fileBuffer);
	});
};

export const removeFromCloudinary = async (public_id) => {
	const result = await cloudinary.uploader.destroy(public_id);
	return result;
};

export default cloudinary;
