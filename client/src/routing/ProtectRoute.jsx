import useCurrentUser from "../features/auth/hooks/useCurrentUser";
import { useLocation, Outlet, Navigate } from "react-router-dom";

export default function ProtectRoute() {
	const { isAuthenticated, isLoading, user } = useCurrentUser();
	const location = useLocation();
	const token = localStorage.getItem("token");

	console.log("ProtectRoute Status:", { isAuthenticated, isLoading, hasToken: !!token, hasUser: !!user });

	// Show a loading indicator while user info is being fetched
	// or if we have a token but haven't loaded the user yet
	if (isLoading)
		return (
			<div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950">
				<div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
			</div>
		);

	// If user is not authenticated and no token is present, redirect to login
	if (!isAuthenticated && !token) {
		console.log("ProtectRoute: No auth and no token, redirecting to login");
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	// If we have a token but query finished and we're still not authenticated,
	// it means the token was invalid (and was likely removed by interceptor)
	if (token && !isAuthenticated && !isLoading) {
		console.log("ProtectRoute: Token exists but not authenticated, redirecting to login");
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	console.log("ProtectRoute: Access granted");
	return <Outlet />;
}
