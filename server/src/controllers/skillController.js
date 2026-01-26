import SkillModel from "../models/skillModel.js";

// Helper to handle ESM/CJS interop for default exports
const getExport = (mod) => {
    if (mod && mod.default) return mod.default;
    return mod;
};

const Skill = getExport(SkillModel);

import {
	createDoc,
	deleteDoc,
	getAllDocs,
	getDocById,
	updateDoc,
} from "./handlerFactory.js";

// add new skill
export const createSkill = createDoc(Skill, ["name", "skills"]);

// update skill
export const updateSkill = updateDoc(Skill, ["name", "skills"]);

// get skill by id
export const getSkill = getDocById(Skill);

// delete skill by id
export const deleteSkill = deleteDoc(Skill);

// get all skills
export const getAllSkills = getAllDocs(Skill);
