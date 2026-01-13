import { useQuery } from "@tanstack/react-query";
import { getAllEdu } from "../services/education.js";

export default function useEducations() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Educations"],
		queryFn: getAllEdu,
	});
	const educations = response?.data?.data;
	return { educations, isLoading, error };
}
