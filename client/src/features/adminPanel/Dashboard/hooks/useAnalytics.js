import { useQuery } from "@tanstack/react-query";
import { getAnalyticsStats } from "../services/analytics";

export default function useAnalytics() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Analytics"],
		queryFn: getAnalyticsStats,
	});

	const analytics = response?.data || null;
	return { analytics, isLoading, error };
}
