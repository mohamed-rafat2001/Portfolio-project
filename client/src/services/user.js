import mainApi from "../api/mainApi";

// get user profile
export const getMe = async () => {
	try {
		const res = await mainApi.get("users");
		return res;
	} catch (e) {
		return e;
	}
};

// update user data
export const updateMe = async (data) => {
	try {
		const res = await mainApi.patch("users", data);
		return res;
	} catch (e) {
		return e;
	}
};

//update profile image
export const updateProfileImg = async (img) => {
	try {
		const res = await mainApi.patch("users/profileImg", img);
		return res;
	} catch (e) {
		return e;
	}
};
//update user password
export const updatePassword = async (passwords) => {
	try {
		const res = await mainApi.patch("users/updatePassword", passwords);
		return res;
	} catch (e) {
		return e;
	}
};
