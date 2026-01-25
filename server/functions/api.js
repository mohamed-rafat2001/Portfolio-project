import serverless from "serverless-http";

let serverlessHandler;

export const handler = async (event, context) => {
	// Add some debugging info to logs
	console.log(`API Handler called: ${event.httpMethod} ${event.path}`);
	
	try {
		// Dynamically import to catch initialization errors
		const appModule = await import("../app.js");
		const dbConfigModule = await import("../src/db/config.js");

		// Extract the actual exports
		const app = appModule.default || appModule;
		const dbConnect = dbConfigModule.default || dbConfigModule;

		if (typeof app !== "function") {
			throw new Error(`The imported 'app' is not a function. It is a ${typeof app}. Value: ${JSON.stringify(app).substring(0, 100)}`);
		}
		
		if (typeof dbConnect !== "function") {
			throw new Error(`The imported 'dbConnect' is not a function. It is a ${typeof dbConnect}.`);
		}

		// Initialize DB connection
		await dbConnect();

		if (!serverlessHandler) {
			serverlessHandler = serverless(app, {
				binary: ["image/*", "application/pdf"],
			});
		}

		return await serverlessHandler(event, context);
	} catch (error) {
		console.error("Netlify Function Crash Details:", {
			message: error.message,
			stack: error.stack,
			path: event.path,
			method: event.httpMethod
		});
		
		return {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "https://mohamed-rafat-portfolio.netlify.app",
				"Access-Control-Allow-Credentials": "true",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				status: "error",
				message: "Internal Server Error during initialization",
				error: error.message,
				// Include stack trace only if it's not a DB connection error (to avoid leaking DB string if it's in the stack)
				stack: (process.env.NODE_ENV === "development" || !error.message.includes("MongoDB")) ? error.stack : undefined,
			}),
		};
	}
};
