import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { updateProj } from "../../../../services/project.js";

export default function useUpdateProj() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		updateProj,
		"Projects"
	);
	return { error, isLoading, updateProj: mutate, data };
}
