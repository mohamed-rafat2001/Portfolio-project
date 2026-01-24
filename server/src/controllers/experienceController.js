import ExperienceModel from "../models/experienceModel.js";
import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
	updateDoc,
} from "./handlerFactory.js";

// add new Experience
export const createExperience = createDoc(ExperienceModel, [
	"company",
	"description",
	"duration",
	"role",
]);

// update Experience
export const updateExperience = updateDoc(ExperienceModel, [
	"company",
	"description",
	"duration",
	"role",
]);

// get Experience by id
export const getExperience = getDocById(ExperienceModel);

// delete Experience by id
export const deleteExperience = deleteDoc(ExperienceModel);

// get all experiences
export const getAllExperiences = getAllDocs(ExperienceModel);
