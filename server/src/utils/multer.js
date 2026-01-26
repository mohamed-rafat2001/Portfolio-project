import multer from "multer";
import appError from "./appError.js";

// Handle potential ESM/CJS interop issues with multer
const getExport = (mod) => (mod && mod.default ? mod.default : mod);
const multerLib = getExport(multer);
const AppError = getExport(appError);

const storage = multerLib.memoryStorage();

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image") || file.mimetype === "application/pdf") {
		cb(null, true);
	} else {
		cb(new AppError("Invalid file type! Please upload only images or PDFs.", 400), false);
	}
};

export const upload = multerLib({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 10 * 1024 * 1024, // 10MB limit
	},
});

export default upload;
