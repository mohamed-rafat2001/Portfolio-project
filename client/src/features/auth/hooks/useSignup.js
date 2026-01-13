import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../../../services/auth.js";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		mutate: signUpFunc,
		data: response,
		error,
		isLoading,
	} = useMutation({
		mutationFn: signUp,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["User"] });
			navigate("/login");
		},
	});
	const user = response?.data?.data?.user;
	return { user, error, isLoading, signUpFunc };
}
