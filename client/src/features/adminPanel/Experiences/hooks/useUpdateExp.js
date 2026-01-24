import useMutationFactory from "../../../../shared/hooks/useMutationFactory";
import { updateExperience } from "../services/experience";

export default function useUpdateExp() {
<<<<<<< HEAD
	const { error, isLoading, mutate, data } = useMutationFactory(
		updateExp,
		"Experiences"
	);
	return { error, isLoading, updateExp: mutate, data };
=======
	return useMutationFactory(updateExperience, "Experiences");
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
}
