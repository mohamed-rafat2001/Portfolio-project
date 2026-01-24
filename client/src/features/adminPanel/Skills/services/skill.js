import mainApi from "../../../../api/mainApi.js";

// create skill func
export const createSkill = async (data) => {
	const res = await mainApi.post("skills", data);
	return res.data;
};

// get all skills
export const getAllSkills = async () => {
	const res = await mainApi.get("skills");
	return res.data;
};

// get single skill by id
export const getSingleSkill = async (id) => {
	const res = await mainApi.get(`skills/${id}`);
	return res.data;
};

// update single skill by id
export const updateSkill = async ({ id, data }) => {
	const res = await mainApi.patch(`skills/${id}`, data);
	return res.data;
};

// delete single skill by id
export const deleteSkill = async (id) => {
	const res = await mainApi.delete(`skills/${id}`);
	return res.data;
};
