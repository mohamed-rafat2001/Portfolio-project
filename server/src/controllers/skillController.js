import SkillModel from "../models/skillModel.js";
import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
	updateDoc,
} from "./handlerFactory.js";

// add new Skill
export const createSkill = createDoc(SkillModel, ["name", "skills"]);

// update Skill
export const updateSkill = updateDoc(SkillModel, ["name", "skills"]);

// get Skill by id
export const getSkill = getDocById(SkillModel);

// delete Skill by id
export const deleteSkill = deleteDoc(SkillModel);

// get all skills
export const getAllSkills = getAllDocs(SkillModel);
