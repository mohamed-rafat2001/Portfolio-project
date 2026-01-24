import { useQuery } from "@tanstack/react-query";
import { getAllEducations } from "../services/education.js";

export default function useEducations(params) {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Educations", params],
		queryFn: () => getAllEducations(params),
	});

	const educations = response?.data?.educations || [];
	const totalResults = response?.data?.totalResults || 0;
	return { educations, isLoading, error, totalResults };
}
