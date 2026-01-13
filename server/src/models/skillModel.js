import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			min: 3,
			required: [true, "name is required"],
		},
		skills: [String],
	},
	{ timestamps: true }
);

export default mongoose.model("SkillsModel", skillSchema);
