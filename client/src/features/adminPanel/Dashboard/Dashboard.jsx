import {
	HiOutlineBriefcase,
	HiOutlineAcademicCap,
	HiOutlineEnvelope,
	HiOutlineCodeBracket,
	HiOutlineEye,
} from "react-icons/hi2";
import useProjects from "../Projects/hooks/useProjects";
import useSkills from "../Skills/hooks/useSkills";
import useEmails from "../Emails/hooks/useEmails";
import useExperiences from "../Experiences/hooks/useExperiences";
import useEducations from "../Educations/hooks/useEducations";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import useAnalytics from "./hooks/useAnalytics";
import WelcomeSection from "./components/WelcomeSection";
import VisitorTrendChart from "./components/VisitorTrendChart";
import QuickActions from "./components/QuickActions";
import StatCard from "./components/StatCard";
import LoadingState from "../../../shared/components/ui/LoadingState";

const Dashboard = () => {
	const { user } = useCurrentUser();
	const { projects, isLoading: projectsLoading } = useProjects();
	const { skills, isLoading: skillsLoading } = useSkills();
	const { emails, isLoading: emailsLoading } = useEmails();
	const { experiences, isLoading: expLoading } = useExperiences();
	const { educations, isLoading: eduLoading } = useEducations();
	const { analytics, isLoading: analyticsLoading } = useAnalytics();

	const isLoading =
		projectsLoading ||
		skillsLoading ||
		emailsLoading ||
		expLoading ||
		eduLoading ||
		analyticsLoading;

	if (isLoading) return <LoadingState message="Loading your dashboard..." />;

	const stats = [
		{
			title: "Projects",
			value: projects?.length || 0,
			icon: <HiOutlineCodeBracket />,
			color: "bg-blue-500",
			trend: "+2 this month",
		},
		{
			title: "Experience",
			value: experiences?.length || 0,
			icon: <HiOutlineBriefcase />,
			color: "bg-orange",
			trend: "Active",
		},
		{
			title: "Education",
			value: educations?.length || 0,
			icon: <HiOutlineAcademicCap />,
			color: "bg-purple-500",
			trend: "Completed",
		},
		{
			title: "Emails",
			value: emails?.filter((e) => !e.isRead).length || 0,
			icon: <HiOutlineEnvelope />,
			color: "bg-green-500",
			trend: "Unread",
		},
	];

	return (
		<div className="space-y-12">
			{/* Header Section */}
			<WelcomeSection user={user} />

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{stats.map((stat) => (
					<StatCard key={stat.title} {...stat} />
				))}
			</div>

			{/* Charts & Secondary Stats */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<VisitorTrendChart data={analytics?.visitorTrends || []} />
				</div>
				<div className="bg-orange dark:bg-orange/90 rounded-[2.5rem] p-8 text-white shadow-xl shadow-orange/20 flex flex-col justify-between">
					<div>
						<div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mb-6">
							<HiOutlineEye />
						</div>
						<h3 className="text-xl font-black uppercase tracking-tight mb-2">
							Total Views
						</h3>
						<p className="text-4xl font-black">{analytics?.totalViews || 0}</p>
					</div>
					<div className="mt-8 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
						<p className="text-sm font-bold opacity-80 mb-1 uppercase tracking-widest">
							Most Viewed
						</p>
						<p className="font-black truncate">
							{analytics?.mostViewedProject?.title || "No projects yet"}
						</p>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="space-y-6">
				<h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
					Quick Actions
				</h3>
				<QuickActions />
			</div>
		</div>
	);
};

export default Dashboard;
