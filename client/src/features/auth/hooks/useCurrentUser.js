import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../adminPanel/Profile/services/user.js";

export default function useCurrentUser() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["User"],
		queryFn: getMe,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});
	const user = response?.data || null;
	return { user, isAuthenticated: !!user, isLoading, error };
}
