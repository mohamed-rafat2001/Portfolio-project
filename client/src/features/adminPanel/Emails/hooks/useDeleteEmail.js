import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { deleteEmail } from "../services/email";

export default function useDeleteEmail() {
	return useMutationFactory(deleteEmail, "Emails");
}
