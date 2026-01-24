import {
	HiOutlineBriefcase,
	HiOutlineAcademicCap,
	HiOutlineEnvelope,
	HiOutlineRocketLaunch,
    HiOutlineWrenchScrewdriver,
    HiOutlineChartBar
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import useProjects from "../Projects/hooks/useProjects";
import useSkills from "../Skills/hooks/useSkills";
import useEmails from "../Emails/hooks/useEmails";
import useExperiences from "../Experiences/hooks/useExperiences";
import useEducations from "../Educations/hooks/useEducations";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import useAnalytics from "./hooks/useAnalytics";
import WelcomeSection from "./components/WelcomeSection";
import VisitorTrendChart from "./components/VisitorTrendChart";
import StatCard from "./components/StatCard";
import LoadingState from "../../../shared/components/ui/LoadingState";

const Dashboard = () => {
	const { user } = useCurrentUser();
	const { projects, totalResults: totalProjects, isLoading: projectsLoading } = useProjects();
	const { skills, isLoading: skillsLoading } = useSkills();
	const { emails, totalResults: totalEmails, isLoading: emailsLoading } = useEmails();
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

	const visitorStats = [
		{ title: "Today's Visits", value: analytics?.todayVisits || 0, icon: <HiOutlineChartBar />, color: "bg-orange" },
		{ title: "Last 7 Days", value: analytics?.last7Days || 0, icon: <HiOutlineChartBar />, color: "bg-blue-600" },
		{ title: "Last 30 Days", value: analytics?.last30Days || 0, icon: <HiOutlineChartBar />, color: "bg-purple-600" },
		{ title: "Last Year", value: analytics?.lastYear || 0, icon: <HiOutlineChartBar />, color: "bg-emerald-600" },
		{ title: "Total Visits", value: analytics?.totalViews || 0, icon: <HiOutlineChartBar />, color: "bg-rose-600" },
	];

    const contentStats = [
        { title: "Projects", value: totalProjects || 0, icon: <HiOutlineRocketLaunch />, color: "bg-blue-600" },
        { title: "Skills", value: skills?.length || 0, icon: <HiOutlineWrenchScrewdriver />, color: "bg-orange" },
        { title: "Messages", value: totalEmails || 0, icon: <HiOutlineEnvelope />, color: "bg-purple-600" },
        { title: "Experience", value: experiences?.length || 0, icon: <HiOutlineBriefcase />, color: "bg-emerald-600" },
        { title: "Education", value: educations?.length || 0, icon: <HiOutlineAcademicCap />, color: "bg-rose-600" },
    ];

    const unreadEmails = emails?.filter(e => !e.isRead).length || 0;

	return (
		<div className="space-y-14 pb-20">
			{/* 1. Welcome & Visitor Analytics */}
			<WelcomeSection user={user} />
            
            <section className="space-y-10">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-orange rounded-full" />
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Visitor Analytics</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {visitorStats.map((stat) => (
                        <div key={stat.title} className="p-6 md:p-8 bg-[#0b1120] border border-white/5 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center">
                            <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-2xl text-white mb-6 shadow-2xl`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.title}</p>
                        </div>
                    ))}
                </div>
            </section>

			{/* 2. Main Visualization & Sidebar Cards */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
				<div className="lg:col-span-8 min-w-0">
					<VisitorTrendChart data={analytics?.visitorTrends || []} />
				</div>
                
                <div className="lg:col-span-4 flex flex-col gap-10">
                    {/* Grow Portfolio Card */}
                    <div className="bg-orange rounded-[3rem] p-10 text-white shadow-2xl shadow-orange/30 relative overflow-hidden group">
                        <div className="relative z-10 h-full flex flex-col justify-between min-h-[220px]">
                            <div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-tight">Grow your portfolio</h3>
                                <p className="text-orange-950/60 font-bold leading-relaxed mb-8">Keep your projects and skills updated to attract more visitors.</p>
                            </div>
                            <Link 
                                to="/adminPanel/projects" 
                                className="inline-flex items-center justify-center gap-4 bg-white px-10 py-5 rounded-3xl text-orange font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl"
                            >
                                Add Project <HiOutlineRocketLaunch className="text-xl" />
                            </Link>
                        </div>
                        <HiOutlineRocketLaunch className="absolute -right-10 -bottom-10 text-[18rem] text-white/5 -rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-1000" />
                    </div>

                    {/* Email Summary Card */}
                    <div className="bg-[#0b1120] rounded-[3rem] p-10 border border-white/5 shadow-2xl flex flex-col justify-between min-h-[220px]">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-[#030712] border border-white/5 flex items-center justify-center text-orange text-3xl shadow-2xl">
                                <HiOutlineEnvelope />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Emails</h3>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{unreadEmails} UNREAD EMAILS</p>
                            </div>
                        </div>
                        <Link 
                            to="/adminPanel/emails" 
                            className="w-full py-5 rounded-3xl border-2 border-white/5 text-white font-black uppercase tracking-widest text-[10px] text-center hover:bg-white hover:text-black transition-all"
                        >
                            View Inbox
                        </Link>
                    </div>
                </div>
			</div>

			{/* 3. Content Overview */}
            <section className="space-y-10">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-orange rounded-full" />
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Content Overview</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contentStats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>
            </section>
		</div>
	);
};

export default Dashboard;
