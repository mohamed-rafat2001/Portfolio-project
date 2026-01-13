import mainApi from "../api/mainApi.js";

// signup func
export const signUp = async (data) => {
	try {
		const res = mainApi.post("auth/signup", data);
		return res;
	} catch (e) {
		return e;
	}
};

// login func
export const login = async (data) => {
	try {
		const res = await mainApi.post("auth/login", data);
		return res;
	} catch (e) {
		return e;
	}
};

// logout func
export const logOut = async (data) => {
	try {
		const res = await mainApi.post("auth/logout", data);
		return res;
	} catch (e) {
		return e;
	}
};

// forgotPassword func
export const forgotPassword = async (data) => {
	try {
		const res = await mainApi.post("auth/forgotPassword", data);
		return res;
	} catch (e) {
		return e;
	}
};

// reset password func
export const resetPassword = async (data) => {
	try {
		const res = await mainApi.patch("auth/resetPassword", data);
		return res;
	} catch (e) {
		return e;
	}
};
