import { useEffect, useRef, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { useLocation, Outlet, Navigate } from "react-router-dom";

export default function ProtectRoute() {
	const { isAuthenticated, isLoading } = useCurrentUser();
	const location = useLocation();
	// Keep track if the user has just become unauthenticated
	const wasAuthenticated = useRef(isAuthenticated);
	const [shouldRedirect, setShouldRedirect] = useState(false);

	// Watch for changes to isAuthenticated after mount
	useEffect(() => {
		if (wasAuthenticated.current && !isAuthenticated) {
			setShouldRedirect(true);
		}

		wasAuthenticated.current = isAuthenticated;
	}, [isAuthenticated]);

	// Show a loading indicator while user info is being fetched
	if (isLoading) return <h1>is loading</h1>;

	// If user is not authenticated (either initially or due to state change), redirect to login
	if (!isAuthenticated || shouldRedirect)
		return <Navigate to="/login" state={{ from: location }} replace />;

	return <Outlet />;
}
