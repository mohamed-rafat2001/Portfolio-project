import mainApi from "../api/mainApi.js";

// create skill func
export const createSkill = async (data) => {
	try {
		const res = await mainApi.post("skills", data);
		return res;
	} catch (e) {
		return e;
	}
};
// get all skills
export const getAllSkills = async () => {
	try {
		const res = await mainApi.get("skills");
		return res;
	} catch (e) {
		return e;
	}
};
// get single skill by id
export const getSingleSkill = async (id) => {
	try {
		const res = await mainApi.get(`skills/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};

// update single skill by id
export const updateSkill = async (id, data) => {
	try {
		const res = await mainApi.patch(`skills/${id}`, data);
		return res;
	} catch (e) {
		return e;
	}
};

// delete single skill by id
export const deleteSkill = async (id) => {
	try {
		const res = await mainApi.delete(`skills/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};
