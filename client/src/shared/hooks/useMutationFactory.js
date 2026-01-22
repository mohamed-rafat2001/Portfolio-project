import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutationFactory(serviceFn, keyName) {
	const [progress, setProgress] = useState(0);
	const queryClient = useQueryClient();
	const { error, isLoading, data, mutate } = useMutation({
		mutationFn: (variables) => serviceFn(variables, setProgress),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keyName] });
			setProgress(0);
		},
		onError: () => {
			setProgress(0);
		}
	});
	return { error, isLoading, data: data?.data, mutate, progress };
}
