import axios from "axios";

const getBaseURL = () => {
	const url = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1/";
	// Ensure the production URL ends with /api/v1/ if it doesn't already
	if (!url.endsWith("/api/v1/")) {
		return `${url.replace(/\/$/, "")}/api/v1/`;
	}
	return url;
};

const mainApi = axios.create({
	baseURL: getBaseURL(),
	withCredentials: true,
});

// Response interceptor - Handle token expiration
mainApi.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		// Only redirect if it's a 401 error and not a request to the user profile
		// which is already handled by the ProtectedRoute and useCurrentUser hook
		if (
			error.response?.status === 401 &&
			!error.config.url.includes("users") &&
			!error.config.url.includes("auth/login")
		) {
			const publicPaths = ["/login", "/signup", "/"];
			const currentPath = window.location.pathname;

			if (!publicPaths.includes(currentPath)) {
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	}
);

export default mainApi;
