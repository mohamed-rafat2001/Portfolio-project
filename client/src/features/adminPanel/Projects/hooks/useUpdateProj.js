import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { updateProject } from "../services/project";

export default function useUpdateProj() {
	return useMutationFactory(updateProject, "Projects");
}
