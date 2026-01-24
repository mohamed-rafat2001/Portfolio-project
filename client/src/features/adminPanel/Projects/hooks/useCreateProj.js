import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { createProject } from "../services/project";

export default function useCreateProj() {
	return useMutationFactory(createProject, "Projects");
}
