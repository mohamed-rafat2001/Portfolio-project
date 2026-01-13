import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { updateExp } from "../../../../services/experience.js";

export default function useDeleteExp() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		updateExp,
		"Experiences"
	);
	return { error, isLoading, updateExp: mutate, data };
}
