import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "title is required"],
		},
		description: {
			type: String,
			trim: true,
			min: 20,
			required: [true, "description is required"],
		},
		techStack: [
			{
				title: {
					type: String,
					required: true,
				},
				techs: [String],
			},
		],
		mainImg: { public_id: String, secure_url: String },
		images: [
			{
				public_id: String,
				secure_url: String,
			},
		],
		liveUrl: {
			type: String,
			trim: true,
			required: [true, "liveUrl is required"],
		},
		repoUrl: {
			type: String,
			trim: true,
			required: [true, "repoUrl is required"],
		},
		status: {
			type: String,
			trim: true,
			default: "Completed & Live"
		},
		architecture: {
			type: String,
			trim: true,
			default: "Full Stack Web App"
		},
		isPreferred: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("ProjectModel", projectSchema);
