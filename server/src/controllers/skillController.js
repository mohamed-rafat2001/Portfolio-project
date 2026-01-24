import SkillModel from "../models/skillModel.js";
import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
	updateDoc,
} from "./handlerFactory.js";

// add new skill
export const createSkill = createDoc(SkillModel, ["name", "skills"]);

// update skill
export const updateSkill = updateDoc(SkillModel, ["name", "skills"]);

// get skill by id
export const getSkill = getDocById(SkillModel);

// delete skill by id
export const deleteSkill = deleteDoc(SkillModel);

// get all skills
export const getAllSkills = getAllDocs(SkillModel);
