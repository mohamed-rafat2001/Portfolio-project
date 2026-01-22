import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "name is required"],
		},
		description: {
			type: String,
			trim: true,
			min: 20,
			required: [true, "description is required"],
		},
		techStack: [{
			title:{
				type: String,
				trim: true,
				min: 5,
			},
			techs:[String]
		}],
		mainImg: {
			public_id: String,
			secure_url: String,
		},
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
		isPreferred: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("ProjectModel", projectSchema);
