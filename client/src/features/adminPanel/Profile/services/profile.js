import mainApi from "../../../../api/mainApi";

export const updateProfileImg = async (data, onProgress) => {
    const res = await mainApi.patch("users/profileImg", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            if (onProgress) onProgress(percentCompleted);
        }
    });
    return res.data;
};

export const updatePassword = async (data) => {
    const res = await mainApi.patch("users/updatePassword", data);
    return res.data;
};
