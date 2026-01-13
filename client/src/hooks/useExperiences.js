import { useQuery } from "@tanstack/react-query";
import { getAllExps } from "../services/experience.js";

export default function useExperiences() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Experiences"],
		queryFn: getAllExps,
	});
	const experiences = response?.data?.data;
	return { experiences, isLoading, error };
}
