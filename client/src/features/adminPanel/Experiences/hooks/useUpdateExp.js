import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { updateExperience } from "../services/experience";

export default function useUpdateExp() {
	return useMutationFactory(updateExperience, "Experiences");
}
