import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleProject } from "../services/project.js";

export default function useProject() {
	const { id } = useParams();
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Project", id],
		queryFn: () => getSingleProject(id),
		enabled: !!id,
	});

	const project = response?.data?.project || null;
	return { project, isLoading, error };
}
