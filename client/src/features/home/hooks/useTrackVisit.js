import { useEffect } from "react";
import { trackVisit } from "../services/analytics";

export default function useTrackVisit(user, isUserLoading) {
	useEffect(() => {
		// Track visit only once per session/mount for non-authenticated users
		const track = async () => {
			if (isUserLoading || user) return;

			try {
				await trackVisit();
			} catch (err) {
				console.error("Failed to track visit:", err);
			}
		};
		track();
	}, [user, isUserLoading]);
}
