import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { createExperience } from "../services/experience";

export default function useCreateExp() {
	return useMutationFactory(createExperience, "Experiences");
}
