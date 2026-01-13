import mainApi from "../api/mainApi.js";

// create education func
export const createEdu = async (data) => {
	try {
		const res = await mainApi.post("educations", data);
		return res;
	} catch (e) {
		return e;
	}
};

// get all educations
export const getAllEdu = async () => {
	try {
		const res = await mainApi.get("educations");
		return res;
	} catch (e) {
		return e;
	}
};
// get single education by id
export const getSingleEdu = async (id) => {
	try {
		const res = await mainApi.get(`educations/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};

// update single education by id
export const updateEdu = async (id, data) => {
	try {
		const res = await mainApi.patch(`educations/${id}`, data);
		return res;
	} catch (e) {
		return e;
	}
};

// delete single education by id
export const deleteEdu = async (id) => {
	try {
		const res = await mainApi.delete(`educations/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};
