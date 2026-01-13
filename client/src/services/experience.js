import mainApi from "../api/mainApi.js";

// create experience func
export const createExp = async (data) => {
	try {
		const res = await mainApi.post("experiences", data);
		return res;
	} catch (e) {
		return e;
	}
};
// get all experiences
export const getAllExps = async () => {
	try {
		const res = await mainApi.get("experiences");
		return res;
	} catch (e) {
		return e;
	}
};
// get single experience by id
export const getSingleExp = async (id) => {
	try {
		const res = await mainApi.get(`experiences/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};

// update single experience by id
export const updateExp = async (id, data) => {
	try {
		const res = await mainApi.patch(`experiences/${id}`, data);
		return res;
	} catch (e) {
		return e;
	}
};

// delete single experience by id
export const deleteExp = async (id) => {
	try {
		const res = await mainApi.delete(`experiences/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};
