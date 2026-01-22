import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import useAdminInfo from "../../features/adminPanel/Profile/hooks/useAdminInfo";
import useCurrentUser from "../../features/auth/hooks/useCurrentUser";
import useTrackVisit from "./hooks/useTrackVisit";
import LoadingState from "../../shared/components/ui/LoadingState";

const Home = () => {
	const { admin, isLoading: isAdminLoading } = useAdminInfo();
	const { user, isLoading: isUserLoading } = useCurrentUser();

	useTrackVisit(user, isUserLoading);

	if (isAdminLoading || isUserLoading) return <LoadingState message="Loading Portfolio..." />;

	// Priority: Logged in user (if any), otherwise Admin Info
	const displayUser = user || admin;

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
