import mainApi from "../../../api/mainApi.js";

// login func
export const login = async (data) => {
	const res = await mainApi.post("auth/login", data);
	return res.data;
};

// logout func
export const logOut = async () => {
	const res = await mainApi.post("auth/logout");
	return res.data;
};

// forgotPassword func
export const forgotPassword = async (data) => {
	const res = await mainApi.post("auth/forgotPassword", data);
	return res.data;
};

// reset password func
export const resetPassword = async (data) => {
	const res = await mainApi.patch("auth/resetPassword", data);
	return res.data;
};
