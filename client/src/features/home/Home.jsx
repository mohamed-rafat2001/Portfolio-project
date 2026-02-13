import { lazy, Suspense } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import useAdminInfo from "../../shared/hooks/useAdminInfo";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";
import useTrackVisit from "./hooks/useTrackVisit";
import LoadingState from "../../shared/components/ui/LoadingState";

const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));

const Home = () => {
	const { admin, isLoading: isAdminLoading } = useAdminInfo();
	const { user } = useCurrentUser();

	useTrackVisit(user, false);

	if (isAdminLoading) return <LoadingState message="Loading Portfolio..." fullScreen />;

	if (!admin) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-[#030712] text-white p-4">
				<h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
				<p className="text-gray-400 mb-8">Could not load portfolio data. Please try again later.</p>
				<button 
					onClick={() => window.location.reload()}
					className="px-6 py-2 bg-orange text-white rounded-full hover:bg-orange/80 transition-colors"
				>
					Retry
				</button>
			</div>
		);
	}

	// Always show admin info for all visitors - user is optional
	const displayUser = admin;

	return (
		<div className="flex flex-col">
			<Hero user={displayUser} />
			<About user={displayUser} />
			<Projects limit={6} user={displayUser} />
			<Experience user={displayUser} />
			<Skills user={displayUser} />
			<Contact user={displayUser} />
		</div>
	);
};

export default Home;
