import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { createEducation } from "../services/education";

export default function useCreateEdu() {
	return useMutationFactory(createEducation, "Educations");
}
