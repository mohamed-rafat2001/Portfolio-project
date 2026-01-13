import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/user.js";

export default function useCurrentUser() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["User"],
		queryFn: getMe,
		retry: Infinity,
		staleTime: 5 * 60 * 1000,
	});
	const user = response?.data?.data;
	return { user, isAuthenticated: !!user, isLoading, error };
}
