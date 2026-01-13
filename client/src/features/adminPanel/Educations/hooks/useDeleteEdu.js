import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { deleteEdu } from "../../../../services/education.js";

export default function useDeleteEdu() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		deleteEdu,
		"Educations"
	);
	return { error, isLoading, deleteEdu: mutate, data };
}
