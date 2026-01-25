import serverless from "serverless-http";
import app from "../app.js";
import dbConnect from "../src/db/config.js";

let serverlessHandler;

export const handler = async (event, context) => {
	try {
		// Initialize DB connection
		await dbConnect();

		if (!serverlessHandler) {
			serverlessHandler = serverless(app);
		}

		return await serverlessHandler(event, context);
	} catch (error) {
		console.error("Netlify Function Error:", error);
		return {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "https://mohamed-rafat-portfolio.netlify.app",
				"Access-Control-Allow-Credentials": "true",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				status: "error",
				message: "Internal Server Error in Netlify Function",
				error: error.message,
			}),
		};
	}
};
