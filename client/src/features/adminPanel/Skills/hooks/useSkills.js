import { useQuery } from "@tanstack/react-query";
import { getAllSkills } from "../services/skill.js";

export default function useSkills(params) {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Skills", params],
		queryFn: () => getAllSkills(params),
	});
	const skills = response?.data?.skills || [];
	const totalResults = response?.data?.totalResults || 0;
	return { skills, isLoading, error, totalResults };
}
