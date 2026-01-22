import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
	{
		ip: String,
		userAgent: String,
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

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
