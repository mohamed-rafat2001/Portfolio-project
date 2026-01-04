import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

const dbPassword = process.env.NODE_MODE === "PRODUCTION"
    ? process.env.DB_PASSWORD : undefined

const dbUrl = process.env.NODE_MODE === "PRODUCTION"
    ? process.env.PRODUCTION_DB_URL.replace("<db_password>", dbPassword) : process.env.LOCAL_DB_URL
export default function dbConnect() {
    if (!dbUrl) {
		console.error("DB_URL is not defined in environment variables");
		return;
    }
    mongoose
            .connect(dbUrl)
            .then(() => console.log("db is connected"))
            .catch((e) => console.log(e.message));
}