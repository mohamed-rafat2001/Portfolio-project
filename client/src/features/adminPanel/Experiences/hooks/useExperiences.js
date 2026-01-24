import { useQuery } from "@tanstack/react-query";
import { getAllExperiences } from "../services/experience.js";

export default function useExperiences() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Experiences"],
		queryFn: getAllExperiences,
	});

	const experiences = response?.data?.experiences || [];
	return { experiences, isLoading, error };
}
