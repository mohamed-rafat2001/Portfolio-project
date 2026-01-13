import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { deleteEmail } from "../../../../services/email.js";

export default function useDeleteEmail() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		deleteEmail,
		"Emails"
	);
	return { error, isLoading, deleteEmail: mutate, data };
}
