import { useQuery } from "@tanstack/react-query";
import { getAllEducations } from "../services/education.js";

export default function useEducations() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Educations"],
		queryFn: getAllEducations,
	});

	const educations = response?.data?.educations || [];
	return { educations, isLoading, error };
}
