import serverless from "serverless-http";

let serverlessHandler;

export const handler = async (event, context) => {
	try {
		// Dynamically import to catch initialization errors
		const { default: app } = await import("../app.js");
		const { default: dbConnect } = await import("../src/db/config.js");

		// Initialize DB connection
		await dbConnect();

		if (!serverlessHandler) {
			serverlessHandler = serverless(app);
		}

		return await serverlessHandler(event, context);
	} catch (error) {
		console.error("Netlify Function Crash:", error);
		return {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "https://mohamed-rafat-portfolio.netlify.app",
				"Access-Control-Allow-Credentials": "true",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				status: "error",
				message: "The server function crashed during initialization. Check the error details below.",
				error: error.message,
				stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
			}),
		};
	}
};
