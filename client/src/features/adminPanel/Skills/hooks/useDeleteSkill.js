import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { deleteSkill } from "../../../../services/skill.js";

export default function useDeleteSkill() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		deleteSkill,
		"Skills"
	);
	return { error, isLoading, deleteSkill: mutate, data };
}
