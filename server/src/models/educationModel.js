import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
	{
		degree: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "degree is required"],
		},
		institution: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "institution is required"],
		},
		duration: {
			type: String,
			trim: true,
			required: [true, "duration is required"],
		},
		description: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "description is required"],
		},
	},
	{ timestamps: true }
);

export default mongoose.model("EducationModel", educationSchema);
