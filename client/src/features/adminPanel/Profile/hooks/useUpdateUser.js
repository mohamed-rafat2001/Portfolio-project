import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../../../../services/user";
import { toast } from "react-hot-toast";

export default function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading } = useMutation({
		mutationFn: updateMe,
		onSuccess: () => {
			toast.success("Profile updated successfully");
			queryClient.invalidateQueries({ queryKey: ["User"] });
		},
		onError: (err) => {
			toast.error(err.response?.data?.message || "Failed to update profile");
		},
	});

	return { updateUser, isLoading };
}
