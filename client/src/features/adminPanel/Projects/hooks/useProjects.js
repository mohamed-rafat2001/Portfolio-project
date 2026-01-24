import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../services/project.js";

export default function useProjects(params, options = {}) {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Projects", params],
		queryFn: () => getAllProjects(params),
		...options,
	});

	const projects = response?.data?.projects || [];
	const results = response?.results || 0;
	const totalResults = response?.totalResults || 0;
	return { projects, isLoading, error, results, totalResults };
}
