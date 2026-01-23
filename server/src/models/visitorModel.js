import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
	{
		ip: {
			type: String,
			trim: true,
		},
		userAgent: {
			type: String,
			trim: true,
		},
		timestamp: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("VisitorModel", visitorSchema);
