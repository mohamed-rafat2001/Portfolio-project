import ProjectModel from "../models/projectModel.js";
import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
	updateDoc,
} from "./handlerFactory.js";

// add new project
export const createProject = createDoc(ProjectModel, [
	"title",
	"tech",
	"description",
	"liveUrl",
	"repoUrl",
	"mainImg",
	"images",
]);

// update project
export const updateProject = updateDoc(ProjectModel, [
	"title",
	"tech",
	"description",
	"liveUrl",
	"repoUrl",
	"mainImg",
	"images",
]);

// get project by id
export const getProject = getDocById(ProjectModel);

// delete project by id
export const deleteProject = deleteDoc(ProjectModel);

// get all Projects
export const getAllProjects = getAllDocs(ProjectModel);
