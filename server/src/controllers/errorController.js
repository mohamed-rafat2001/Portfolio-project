import appError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new appError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new appError(message, 400);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errors.join(". ")}`;
	return new appError(message, 400);
};

const handleJWTError = () =>
	new appError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
	new appError("Your token has expired! Please log in again.", 401);

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

		// 2) Send generic message
		res.status(500).json({
			status: "error",
			message: "Something went very wrong!",
		});
	}
};

export default (err, req, res, next) => {
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
