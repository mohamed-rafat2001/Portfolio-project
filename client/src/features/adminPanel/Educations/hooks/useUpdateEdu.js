import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { updateEdu } from "../../../../services/education.js";

export default function useUpdateEdu() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		updateEdu,
		"Educations"
	);
	return { error, isLoading, updateEdu: mutate, data };
}
