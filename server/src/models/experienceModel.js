import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "company is required"],
		},
		role: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "role is required"],
		},
		description: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "description is required"],
		},
		duration: {
			type: String,
			trim: true,
			required: [true, "duration is required"],
		},
		files: [String],
	},
	{ timestamps: true }
);

export default mongoose.model("ExperienceModel", experienceSchema);
