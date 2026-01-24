import mainApi from "../../../../api/mainApi.js";

// create email func
export const createEmail = async (data) => {
	const res = await mainApi.post("emails", data);
	return res.data;
};

// get all emails
export const getAllEmails = async (params) => {
	const res = await mainApi.get("emails", { params });
	return res.data;
};

// get single email by id
export const getSingleEmail = async (id) => {
	const res = await mainApi.get(`emails/${id}`);
	return res.data;
};

// delete single email by id
export const deleteEmail = async (id) => {
	const res = await mainApi.delete(`emails/${id}`);
	return res.data;
};

// update email read status
export const updateEmail = async ({ id, data }) => {
	const res = await mainApi.patch(`emails/${id}`, data);
	return res.data;
};
