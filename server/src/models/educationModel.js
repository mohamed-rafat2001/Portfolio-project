import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
	{
		institution: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "institution is required"],
		},
		degree: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "degree is required"],
		},
		description: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "description is required"],
		},
		duration: { type: String, required: true },
		images: [
			{
				public_id: String,
				secure_url: String,
			},
		],
		attachments: [
			{
				public_id: String,
				secure_url: String,
				originalName: String,
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model("EducationModel", educationSchema);
