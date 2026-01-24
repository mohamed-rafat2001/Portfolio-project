import mainApi from "../../../../api/mainApi.js";

// create project func
export const createProject = async (data, onProgress) => {
	const res = await mainApi.post("projects", data, {
		onUploadProgress: (progressEvent) => {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			if (onProgress) onProgress(percentCompleted);
		}
	});
	return res.data;
};

// get all projects
export const getAllProjects = async (params) => {
	const res = await mainApi.get("projects", { params });
	return res.data;
};

// get single project by id
export const getSingleProject = async (id) => {
	const res = await mainApi.get(`projects/${id}`);
	return res.data;
};

// update single project by id
export const updateProject = async ({ id, data }, onProgress) => {
	const res = await mainApi.patch(`projects/${id}`, data, {
		onUploadProgress: (progressEvent) => {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			if (onProgress) onProgress(percentCompleted);
		}
	});
	return res.data;
};

// delete single project by id
export const deleteProject = async (id) => {
	const res = await mainApi.delete(`projects/${id}`);
	return res.data;
};

// increment views
export const incrementViews = async (id) => {
    const res = await mainApi.patch(`projects/${id}/views`);
    return res.data;
};
