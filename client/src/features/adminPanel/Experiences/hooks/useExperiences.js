import { useQuery } from "@tanstack/react-query";
import { getAllExperiences } from "../services/experience.js";

export default function useExperiences(params) {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Experiences", params],
		queryFn: () => getAllExperiences(params),
	});

	const experiences = response?.data?.experiences || [];
	const totalResults = response?.totalResults || 0;
	return { experiences, isLoading, error, totalResults };
}
