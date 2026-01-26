import useCurrentUser from "../features/auth/hooks/useCurrentUser";
import { useLocation, Outlet, Navigate } from "react-router-dom";

export default function ProtectRoute() {
	const { isAuthenticated, isLoading } = useCurrentUser();
	const location = useLocation();

	// Show a loading indicator while user info is being fetched
	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950">
				<div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
			</div>
		);

	// If user is not authenticated, redirect to login
	if (!isAuthenticated)
		return <Navigate to="/login" state={{ from: location }} replace />;

	return <Outlet />;
}
