import useMutationFactory from "../../../../hooks/useMutationFactory.js";
import { createEmail } from "../../../../services/email.js";

export default function useCreateEmail() {
	const { error, isLoading, mutate, data } = useMutationFactory(
		createEmail,
		"Emails"
	);
	return { error, isLoading, createEmail: mutate, data };
}
