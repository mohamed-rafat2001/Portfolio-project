import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { deleteExperience } from "../services/experience";

export default function useDeleteExp() {
	return useMutationFactory(deleteExperience, "Experiences");
}
