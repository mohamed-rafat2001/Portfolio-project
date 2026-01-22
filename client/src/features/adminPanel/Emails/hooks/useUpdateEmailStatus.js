import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { updateEmail } from "../services/email";

export default function useUpdateEmailStatus() {
	return useMutationFactory(updateEmail, "Emails");
}
