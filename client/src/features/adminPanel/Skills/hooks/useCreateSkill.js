import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { createSkill } from "../../../../services/skill.js";

export default function useCreateSkill() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		createSkill,
		"Skills"
	);
	return { error, isLoading, createSkill: mutate, data };
}
