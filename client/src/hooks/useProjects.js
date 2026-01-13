import { useQuery } from "@tanstack/react-query";
import { getAllProjs } from "../services/project.js";

export default function useProjects() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Projects"],
		queryFn: getAllProjs,
	});
	const projects = response?.data?.data;
	return { projects, isLoading, error };
}
