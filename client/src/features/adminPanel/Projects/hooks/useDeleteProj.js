import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { deleteProject } from "../services/project";

export default function useDeleteProj() {
	return useMutationFactory(deleteProject, "Projects");
}
