import mainApi from "../api/mainApi.js";

// create email func
export const createEmail = async (data) => {
	try {
		const res = await mainApi.post("emails", data);
		return res;
	} catch (e) {
		return e;
	}
};
// get all emails
export const getAllEmails = async () => {
	try {
		const res = await mainApi.get("emails");
		return res;
	} catch (e) {
		return e;
	}
};
// get single email by id
export const getSingleEmail = async (id) => {
	try {
		const res = await mainApi.get(`emails/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};

// delete single email by id
export const deleteEmail = async (id) => {
	try {
		const res = await mainApi.delete(`emails/${id}`);
		return res;
	} catch (e) {
		return e;
	}
};
