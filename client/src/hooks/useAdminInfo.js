import { useQuery } from "@tanstack/react-query";
import { getAdminInfo } from "../services/user.js";

export default function useAdminInfo() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["AdminInfo"],
		queryFn: getAdminInfo,
		staleTime: 10 * 60 * 1000,
		retry: false,
	});
	const admin = response?.data?.data || response?.data || null;
	return { admin, isLoading, error };
}
