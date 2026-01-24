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
	{
		timestamps: true,
	}
);

// Index for faster queries on timestamp
visitorSchema.index({ timestamp: 1 });

const VisitorModel = mongoose.model("VisitorModel", visitorSchema);

export default VisitorModel;
