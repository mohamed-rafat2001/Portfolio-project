import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.PRODUCTION_DB_URL 
	? process.env.PRODUCTION_DB_URL.replace("<db_password>", process.env.DB_PASSWORD)
	: process.env.LOCAL_DB_URL;

let isConnected = false;

export default async function dbConnect() {
	if (isConnected) return;

	if (!dbUrl) {
		console.error("Database connection string (PRODUCTION_DB_URL or LOCAL_DB_URL) is missing");
		return;
	}

	try {
		mongoose.set("strictQuery", true);
		await mongoose.connect(dbUrl, {
			serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
		});
		isConnected = true;
		console.log("MongoDB Connected Successfully");
	} catch (e) {
		console.error("MongoDB Connection Error:", e.message);
		throw e; // Re-throw so the handler can catch it and return 500
	}
}
