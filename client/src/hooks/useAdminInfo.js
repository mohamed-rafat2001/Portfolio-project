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
	});
	const admin = response?.data?.data;
	return { admin, isLoading, error };
}
