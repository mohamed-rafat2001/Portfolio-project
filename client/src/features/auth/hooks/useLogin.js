import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/auth.js";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		mutate: loginFunc,
		data: response,
		error,
		isLoading,
	} = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			// Manually update the User query data to avoid extra fetch and race conditions
			if (data?.user) {
				queryClient.setQueryData(["User"], { status: "success", data: data.user });
			}
			
			// Navigate immediately with the new state
			navigate("/adminPanel/dashboard", { replace: true });
		},
	});
	const user = response?.data?.user || null;
	return { user, error, isLoading, loginFunc };
}
