import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { createSkill } from "../services/skill";

export default function useCreateSkill() {
	return useMutationFactory(createSkill, "Skills");
}
