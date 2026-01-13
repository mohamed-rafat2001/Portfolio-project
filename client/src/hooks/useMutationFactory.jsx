import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutationFactory(serviceFn, keyName) {
	const queryClient = useQueryClient();
	const { error, isLoading, data, mutate } = useMutation({
		mutationFn: serviceFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keyName] });
		},
	});
	return { error, isLoading, data: data?.data?.data, mutate };
}
