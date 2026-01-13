import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { deleteExp } from "../../../../services/experience.js";

export default function useDeleteExp() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		deleteExp,
		"Experiences"
	);
	return { error, isLoading, deleteExp: mutate, data };
}
