import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { createEmail } from "../services/email";

export default function useCreateEmail() {
	return useMutationFactory(createEmail, "Emails");
}
