import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.PRODUCTION_DB_URL 
	? process.env.PRODUCTION_DB_URL.replace("<db_password>", process.env.DB_PASSWORD)
	: process.env.LOCAL_DB_URL;

export default async function dbConnect() {
	// Check if already connected (readyState 1 = connected)
	if (mongoose.connection.readyState === 1) {
		console.log("Using existing MongoDB connection");
		return;
	}

	if (!dbUrl) {
		const msg = "Database connection string (PRODUCTION_DB_URL or LOCAL_DB_URL) is missing";
		console.error(msg);
		throw new Error(msg);
	}

	try {
		mongoose.set("strictQuery", true);
		console.log("Connecting to MongoDB...");
		await mongoose.connect(dbUrl, {
			serverSelectionTimeoutMS: 5000,
		});
		isConnected = true;
		console.log("MongoDB Connected Successfully");
	} catch (e) {
		console.error("MongoDB Connection Error:", e.message);
		throw e;
	}
}
