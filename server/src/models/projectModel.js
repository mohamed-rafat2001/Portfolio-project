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
		techs: [
			{
				type: String,
				trim: true,
				min: 3,
				required: [true, "technologies are required"],
			},
		],
		cover: { public_id: String, secure_url: String },
		images: [{ public_id: String, secure_url: String }],
		liveLink: {
			type: String,
			trim: true,
			required: [true, "liveLink is required"],
		},
		githubLink: {
			type: String,
			trim: true,
			required: [true, "githubLink is required"],
		},
	},
	{ timestamps: true }
);

export default mongoose.model("ProjectModel", projectSchema);
