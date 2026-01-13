import { useQuery } from "@tanstack/react-query";
import { getAllEmails } from "../services/email.js";

export default function useEmails() {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Emails"],
		queryFn: getAllEmails,
	});
	const emails = response?.data?.data;
	return { emails, isLoading, error };
}
