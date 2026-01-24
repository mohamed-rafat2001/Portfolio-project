import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { deleteEducation } from "../services/education";

export default function useDeleteEdu() {
	return useMutationFactory(deleteEducation, "Educations");
}
