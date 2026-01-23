import mainApi from "../api/mainApi.js";

// create project func
export const createProj = async (data) => {
	try {
		const res = await mainApi.post("projects", data);
		return res;
	} catch (e) {
		return e;
	}
};
// get all projects
export const getAllProjs = async () => {
	try {
		const res = await mainApi.get("projects");
		return res;
	} catch (e) {
		return e;
	}
};
// get single project by id
export const getSingleProj = async (id) => {
	try {
		const res = await mainApi.get(`projects/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};

// update single project by id
export const updateProj = async ({ id, data }) => {
	try {
		const res = await mainApi.patch(`projects/${id}`, data);
		return res;
	} catch (e) {
		return e;
	}
};

// delete single project by id
export const deleteProj = async (id) => {
	try {
		const res = await mainApi.delete(`projects/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};
