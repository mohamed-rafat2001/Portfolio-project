import mainApi from "../../../../api/mainApi.js";

// create experience func
export const createExperience = async (data) => {
	const res = await mainApi.post("experiences", data);
	return res.data;
};

// get all experiences
export const getAllExperiences = async (params) => {
	const res = await mainApi.get("experiences", { params });
	return res.data;
};

// get single experience by id
export const getSingleExperience = async (id) => {
	const res = await mainApi.get(`experiences/${id}`);
	return res.data;
};

// update single experience by id
export const updateExperience = async ({ id, data }) => {
	const res = await mainApi.patch(`experiences/${id}`, data);
	return res.data;
};

// delete single experience by id
export const deleteExperience = async (id) => {
	const res = await mainApi.delete(`experiences/${id}`);
	return res.data;
};
