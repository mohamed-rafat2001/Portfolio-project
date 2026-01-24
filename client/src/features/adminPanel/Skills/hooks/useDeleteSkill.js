import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { deleteSkill } from "../services/skill";

export default function useDeleteSkill() {
	return useMutationFactory(deleteSkill, "Skills");
}
