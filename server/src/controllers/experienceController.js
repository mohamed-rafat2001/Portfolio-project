import ExperienceModel from "../models/experienceModel.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const Experience = getExport(ExperienceModel);

import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
	updateDoc,
} from "./handlerFactory.js";

// add new Experience
export const createExperience = createDoc(Experience, [
	"company",
	"description",
	"duration",
	"role",
]);

// update Experience
export const updateExperience = updateDoc(Experience, [
	"company",
	"description",
	"duration",
	"role",
]);

// get Experience by id
export const getExperience = getDocById(Experience);

// delete Experience by id
export const deleteExperience = deleteDoc(Experience);

// get all experiences
export const getAllExperiences = getAllDocs(Experience);
