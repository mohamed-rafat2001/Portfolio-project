import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { deleteProj } from "../../../../services/project.js";

export default function useDeleteProj() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		deleteProj,
		"Projects"
	);
	return { error, isLoading, deleteProj: mutate, data };
}
