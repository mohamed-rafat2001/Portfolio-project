import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { createProj } from "../../../../services/project.js";

export default function useCreateProj() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		createProj,
		"Projects"
	);
	return { error, isLoading, createProj: mutate, data };
}
