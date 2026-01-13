import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { updateSkill } from "../../../../services/skill.js";

export default function useUpdateSkill() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		updateSkill,
		"Skills"
	);
	return { error, isLoading, updateSkill: mutate, data };
}
