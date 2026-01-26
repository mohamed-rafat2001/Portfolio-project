import appError from "../utils/appError.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const AppError = getExport(appError);

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errors.join(". ")}`;
	return new AppError(message, 400);
};

const handleJWTError = () =>
	new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
	new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	// Operational, trusted error: send message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});

		// Programming or other unknown error: don't leak error details
	} else {
		// 1) Log error
		console.error("ERROR 💥", err);

		// 2) Send generic message with error details for troubleshooting
		res.status(500).json({
			status: "error",
			message: "Internal Server Error",
			error: err.message, // Temporarily added for troubleshooting
		});
	}
};

export default (err, req, res, _next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_MODE === "development") {
		let error = { ...err };
		error.message = err.message;

		if (err.name === "CastError") error = handleCastErrorDB(error);
		if (err.code === 11000) error = handleDuplicateFieldsDB(error);
		if (err.name === "ValidationError") error = handleValidationErrorDB(error);
		if (err.name === "JsonWebTokenError") error = handleJWTError();
		if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

		sendErrorDev(error, res);
	} else {
		let error = { ...err };
		error.message = err.message;

		if (err.name === "CastError") error = handleCastErrorDB(error);
		if (err.code === 11000) error = handleDuplicateFieldsDB(error);
		if (err.name === "ValidationError") error = handleValidationErrorDB(error);
		if (err.name === "JsonWebTokenError") error = handleJWTError();
		if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

		sendErrorProd(error, res);
	}
};
