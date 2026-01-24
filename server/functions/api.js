import serverless from "serverless-http";
import app from "../app.js";
import dbConnect from "../src/db/config.js";

let serverlessHandler;

export const handler = async (event, context) => {
	// Initialize DB connection
	await dbConnect();

	if (!serverlessHandler) {
		serverlessHandler = serverless(app);
	}

	return await serverlessHandler(event, context);
};
