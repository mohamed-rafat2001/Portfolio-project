import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/auth.js";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		mutate: loginFunc,
		data: response,
		error,
		isLoading,
	} = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			// Extract user from the nested data structure
			const user = data?.data?.user || data?.user;
			
			// Manually update the User query data to avoid extra fetch and race conditions
			if (user) {
				// Match the structure returned by the getMe service
				queryClient.setQueryData(["User"], { status: "success", data: { data: user } });
				
				// Force immediate cache invalidation to trigger a fresh check in ProtectedRoute
				queryClient.invalidateQueries({ queryKey: ["User"] });
			}
			
			// Navigate immediately with the new state
			// We use a small timeout to ensure the cache update has processed
			setTimeout(() => {
				navigate("/adminPanel/dashboard", { replace: true });
			}, 100);
		},
	});
	const user = response?.data?.user || null;
	return { user, error, isLoading, loginFunc };
}
