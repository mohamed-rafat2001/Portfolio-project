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

	const user = response?.data?.data || response?.data || response || null;
	const isAuthenticated = !!user;

	return { 
		user, 
		isAuthenticated, 
		isLoading: (isLoading || (!!token && !user)) && !error, // If we have a token but no user, we are loading
		error 
	};
}
