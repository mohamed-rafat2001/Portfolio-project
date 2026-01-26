import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../../services/user";

export default function useCurrentUser() {
	const token = localStorage.getItem("token");
	
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["User"],
		queryFn: getMe,
		enabled: !!token, // Only fetch if we have a token
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	const user = response?.data?.data || response?.data || null;
	const isAuthenticated = !!user;

	return { 
		user, 
		isAuthenticated, 
		isLoading: isLoading && !!token, // If no token, we aren't loading, we're just not auth'd
		error 
	};
}
