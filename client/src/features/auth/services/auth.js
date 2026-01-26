import mainApi from "../../../api/mainApi.js";

// login func
export const login = async (data) => {
	const res = await mainApi.post("auth/login", data);
	
	// Store token in localStorage as a fallback for cross-domain issues
	if (res.data?.token) {
		localStorage.setItem("token", res.data.token);
	}
	
	return res.data;
};

// logout func
export const logOut = async () => {
	const res = await mainApi.post("auth/logout");
	localStorage.removeItem("token");
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
