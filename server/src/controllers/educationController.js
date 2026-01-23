import EducationModel from "../models/educationModel.js";
import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
	updateDoc,
} from "./handlerFactory.js";

// add new Education
export const createEducation = createDoc(EducationModel, [
	"degree",
	"institution",
	"duration",
	"description",
]);

// update Education
export const updateEducation = updateDoc(EducationModel, [
	"degree",
	"institution",
	"duration",
	"description",
]);

// get Education by id
export const getEducation = getDocById(EducationModel);

// delete Education by id
export const deleteEducation = deleteDoc(EducationModel);

// get all educations
export const getAllEducations = getAllDocs(EducationModel);
