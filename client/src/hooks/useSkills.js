import { useQuery } from "@tanstack/react-query";
import { getAllSkills } from "../services/skill.js";

export default function useSkills() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Skills"],
		queryFn: getAllSkills,
	});
	const skills = response?.data?.data;
	return { skills, isLoading, error };
}
