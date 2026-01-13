import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { createEdu } from "../../../../services/education.js";

export default function useCreateEdu() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		createEdu,
		"Educations"
	);
	return { error, isLoading, createEdu: mutate, data };
}
