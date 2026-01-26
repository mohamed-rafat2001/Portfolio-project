import axios from "axios";

const getBaseURL = () => {
	let url = import.meta.env.VITE_API_URL;
	
	if (!url) {
		if (import.meta.env.PROD) {
			url = "https://portfolio-app-server.netlify.app/api/v1/";
		} else {
			url = "http://localhost:3000/api/v1/";
		}
	}

	// Ensure the production URL ends with /api/v1/ if it doesn't already
	if (!url.endsWith("/api/v1/")) {
		return `${url.replace(/\/$/, "")}/api/v1/`;
	}
	return url;
};

const mainApi = axios.create({
	baseURL: getBaseURL(),
	withCredentials: true,
	timeout: 15000, // 15 seconds timeout
});

// Request interceptor - Add Authorization header if token exists in localStorage
mainApi.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			// Ensure credentials are sent even with custom headers
			config.withCredentials = true;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor - Handle token expiration
mainApi.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		// Only redirect if it's a 401 error and not a request to the user profile
		// which is already handled by the ProtectedRoute and useCurrentUser hook
		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			
			// Only redirect if it's not a request to the user profile or login
			// which are already handled by hooks
			if (
				!error.config.url.includes("users") &&
				!error.config.url.includes("auth/login")
			) {
				const publicPaths = ["/login", "/signup", "/"];
				const currentPath = window.location.pathname;

				if (!publicPaths.includes(currentPath)) {
					window.location.href = "/login";
				}
			}
		}

		return Promise.reject(error);
	}
);

export default mainApi;
