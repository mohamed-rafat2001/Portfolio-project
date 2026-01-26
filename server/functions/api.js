import serverless from "serverless-http";
import { app as appExport } from "../app.js";
import dbConnectExport from "../src/db/config.js";

let serverlessHandler;

// Helper to get the actual function from a module (handles ESM/CJS interop)
const getFunction = (mod) => {
	if (typeof mod === "function") return mod;
	if (mod && typeof mod.default === "function") return mod.default;
	return mod;
};

const app = getFunction(appExport);
const dbConnect = getFunction(dbConnectExport);

export const handler = async (event, context) => {
	// Add some debugging info to logs
	console.log(`API Handler called: ${event.httpMethod} ${event.path}`);
	
	try {
		// Validation
		if (typeof app !== "function") {
			throw new Error(`The imported 'app' is not a function. It is a ${typeof app}.`);
		}
		
		if (typeof dbConnect !== "function") {
			throw new Error(`The imported 'dbConnect' is not a function. It is a ${typeof dbConnect}.`);
		}

		// Initialize DB connection
		await dbConnect();

		if (!serverlessHandler) {
			serverlessHandler = getFunction(serverless)(app, {
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
				stack: (process.env.NODE_ENV === "development" || !error.message.includes("MongoDB")) ? error.stack : undefined,
			}),
		};
	}
};
