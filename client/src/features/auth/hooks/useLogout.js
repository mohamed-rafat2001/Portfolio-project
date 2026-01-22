import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../services/auth.js";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: logoutFunc } = useMutation({
		mutationFn: logOut,
		onSuccess: () => {
			queryClient.clear();
			navigate("/login");
		},
	});
	return { logoutFunc };
}
