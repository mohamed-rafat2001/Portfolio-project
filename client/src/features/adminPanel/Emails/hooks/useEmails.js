import { useQuery } from "@tanstack/react-query";
import { getAllEmails } from "../services/email.js";

export default function useEmails(params) {
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["Emails", params],
		queryFn: () => getAllEmails(params),
	});
	const emails = response?.data?.emails || [];
	const totalResults = response?.totalResults || 0;
	return { emails, isLoading, error, totalResults };
}
