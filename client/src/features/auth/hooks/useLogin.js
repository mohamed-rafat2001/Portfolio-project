import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../services/auth.js";
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["User"] });
			navigate("/adminPanel/profile");
		},
	});
	const user = response?.data?.data?.user;
	return { user, error, isLoading, loginFunc };
}
