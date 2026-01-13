import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { createExp } from "../../../../services/experience.js";

export default function useCreateExp() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		createExp,
		"Experiences"
	);
	return { error, isLoading, createExp: mutate, data };
}
