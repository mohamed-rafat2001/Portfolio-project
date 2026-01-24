import { useQuery } from "@tanstack/react-query";
import { getAdminInfo } from "../services/user";

export default function useAdminInfo() {
	const { data: response, isLoading, error } = useQuery({
		queryKey: ["AdminInfo"],
		queryFn: getAdminInfo,
		retry: false,
	});

	const admin = response?.data || null;
	return { admin, isLoading, error };
}
