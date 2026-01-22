import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { updateSkill } from "../services/skill";

export default function useUpdateSkill() {
	return useMutationFactory(updateSkill, "Skills");
}
