import mainApi from "../api/mainApi";

// get user profile
export const getMe = async () => {
    const res = await mainApi.get("users");
    return res.data;
};

// get admin info
export const getAdminInfo = async () => {
    const res = await mainApi.get("users/admin-info");
    return res.data;
};

// update user data
export const updateMe = async (data) => {
    const res = await mainApi.patch("users", data);
    return res.data;
};

// update user nested infos
export const updateInfos = async (data) => {
    const res = await mainApi.patch("users/update-infos", data);
    return res.data;
};

//update profile image
export const updateProfileImg = async (img) => {
    const res = await mainApi.patch("users/profileImg", img, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

//update user password
export const updatePassword = async (passwords) => {
    const res = await mainApi.patch("users/updatePassword", passwords);
    return res.data;
};
