import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { updateEducation } from "../services/education";

export default function useUpdateEdu() {
	return useMutationFactory(updateEducation, "Educations");
}
