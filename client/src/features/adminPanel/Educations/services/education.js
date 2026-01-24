import mainApi from "../../../../api/mainApi.js";

// create education func
export const createEducation = async (data) => {
	const res = await mainApi.post("educations", data);
	return res.data;
};

// get all educations
export const getAllEducations = async (params) => {
	const res = await mainApi.get("educations", { params });
	return res.data;
};

// get single education by id
export const getSingleEducation = async (id) => {
	const res = await mainApi.get(`educations/${id}`);
	return res.data;
};

// update single education by id
export const updateEducation = async ({ id, data }) => {
	const res = await mainApi.patch(`educations/${id}`, data);
	return res.data;
};

// delete single education by id
export const deleteEducation = async (id) => {
	const res = await mainApi.delete(`educations/${id}`);
	return res.data;
};
