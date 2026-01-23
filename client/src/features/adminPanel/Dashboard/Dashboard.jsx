import { motion as Motion } from "framer-motion";
import {
	HiOutlineRocketLaunch,
	HiOutlineWrenchScrewdriver,
	HiOutlineBriefcase,
	HiOutlineAcademicCap,
	HiOutlineEnvelope,
	HiOutlineArrowTrendingUp,
	HiOutlineUserGroup,
	HiOutlineHandRaised,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useProjects from "../../../hooks/useProjects";
import useSkills from "../../../hooks/useSkills";
import useExperiences from "../../../hooks/useExperiences";
import useEducations from "../../../hooks/useEducations";
import useEmails from "../../../hooks/useEmails";

const Dashboard = () => {
	const { user } = useCurrentUser();
	const { projects } = useProjects();
	const { skills } = useSkills();
	const { experiences } = useExperiences();
	const { educations } = useEducations();
	const { emails } = useEmails();

	const stats = [
		{
			label: "Projects",
			count: projects?.length || 0,
			icon: HiOutlineRocketLaunch,
			color: "bg-blue-500",
			to: "projects",
		},
		{
			label: "Skills",
			count: skills?.length || 0,
			icon: HiOutlineWrenchScrewdriver,
			color: "bg-green-500",
			to: "skills",
		},
		{
			label: "Experiences",
			count: experiences?.length || 0,
			icon: HiOutlineBriefcase,
			color: "bg-purple-500",
			to: "experiences",
		},
		{
			label: "Educations",
			count: educations?.length || 0,
			icon: HiOutlineAcademicCap,
			color: "bg-orange",
			to: "educations",
		},
	];

	const analytics = [
		{ label: "Today's Visits", count: 0, icon: HiOutlineUserGroup, color: "bg-orange" },
		{ label: "Last 7 Days", count: 0, icon: HiOutlineUserGroup, color: "bg-blue-500" },
		{ label: "Last 30 Days", count: 0, icon: HiOutlineUserGroup, color: "bg-purple-500" },
		{ label: "Last Year", count: 0, icon: HiOutlineUserGroup, color: "bg-green-500" },
		{ label: "Total Visits", count: 0, icon: HiOutlineUserGroup, color: "bg-pink-500" },
	];

	return (
		<div className="space-y-12">
			{/* Welcome Section */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
				<div>
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange">
							<HiOutlineHandRaised className="text-xl" />
						</div>
						<span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange">Welcome Back</span>
					</div>
					<h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-2">
						Hello, <span className="text-orange">{user?.name?.split(" ")[0]}</span>
					</h1>
					<p className="text-gray-500 dark:text-gray-400 font-medium">Here's what's happening with your portfolio today.</p>
				</div>
				<div className="bg-white dark:bg-[#0a0f1c] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800/50 flex items-center gap-4 shadow-sm">
					<div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400">
						<HiOutlineUserGroup className="text-2xl" />
					</div>
					<div>
						<p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ADMINISTRATOR</p>
						<p className="text-sm font-bold text-gray-900 dark:text-white uppercase">ACTIVE SESSION</p>
					</div>
				</div>
			</div>

			{/* Visitor Analytics */}
			<section>
				<div className="flex items-center gap-4 mb-8">
					<div className="w-1.5 h-8 bg-orange rounded-full" />
					<h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">VISITOR ANALYTICS</h2>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{analytics.map((item, index) => (
						<Motion.div
							key={item.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="bg-white dark:bg-[#0a0f1c] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50 shadow-sm group hover:border-orange/20 transition-all"
						>
							<div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-${item.color.split("-")[1]}-500/20`}>
								<item.icon className="text-xl" />
							</div>
							<div className="space-y-1">
								<p className="text-3xl font-black text-gray-900 dark:text-white">{item.count}</p>
								<p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
							</div>
						</Motion.div>
					))}
				</div>
			</section>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Visitor Trend */}
				<div className="lg:col-span-8 space-y-8">
					<div className="bg-white dark:bg-[#0a0f1c] p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800/50 shadow-sm min-h-[400px] relative overflow-hidden">
						<div className="flex items-center justify-between mb-12">
							<div>
								<h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">VISITOR TREND</h3>
								<p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">LAST 7 DAYS</p>
							</div>
							<div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-orange">
								<HiOutlineArrowTrendingUp className="text-xl" />
							</div>
						</div>
						<div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
							<div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-300 dark:text-gray-800">
								<HiOutlineArrowTrendingUp className="text-3xl" />
							</div>
							<p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">Analytics data will appear here once active.</p>
						</div>
					</div>

					{/* Content Overview */}
					<div className="space-y-8">
						<div className="flex items-center gap-4">
							<div className="w-1.5 h-8 bg-orange rounded-full" />
							<h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">CONTENT OVERVIEW</h2>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
							{stats.map((item, index) => (
								<Link key={item.label} to={item.to}>
									<Motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.4 + index * 0.1 }}
										className="bg-white dark:bg-[#0a0f1c] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50 shadow-sm group hover:border-orange/20 hover:translate-y-[-4px] transition-all relative overflow-hidden"
									>
										<div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-white mb-6`}>
											<item.icon className="text-xl" />
										</div>
										<div className="space-y-1 relative z-10">
											<p className="text-3xl font-black text-gray-900 dark:text-white">{item.count}</p>
											<p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
										</div>
										<div className="absolute top-6 right-6 text-gray-200 dark:text-gray-800 group-hover:text-orange/20 transition-colors">
											<HiOutlineArrowTrendingUp className="text-2xl rotate-45" />
										</div>
									</Motion.div>
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* Sidebar Cards */}
				<div className="lg:col-span-4 space-y-8">
					{/* Grow Your Portfolio */}
					<div className="bg-orange p-10 rounded-[3rem] text-white shadow-2xl shadow-orange/20 relative overflow-hidden group">
						<div className="relative z-10 space-y-6">
							<h3 className="text-3xl font-black uppercase tracking-tight leading-tight">GROW YOUR PORTFOLIO</h3>
							<p className="text-white/80 font-medium text-sm">Keep your projects and skills updated to attract more visitors.</p>
							<Link
								to="projects"
								className="inline-flex items-center gap-3 bg-white text-orange px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-transform"
							>
								ADD PROJECT <HiOutlineRocket className="text-lg" />
							</Link>
						</div>
						<HiOutlineRocket className="absolute -right-8 -bottom-8 text-[12rem] text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
					</div>

					{/* Emails Card */}
					<div className="bg-white dark:bg-[#0a0f1c] p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800/50 shadow-sm relative overflow-hidden group">
						<div className="flex items-start justify-between mb-8">
							<div className="w-14 h-14 rounded-2xl bg-orange/10 flex items-center justify-center text-orange">
								<HiOutlineEnvelope className="text-2xl" />
							</div>
							<div className="text-right">
								<h3 className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white">EMAILS</h3>
								<p className="text-[10px] font-black uppercase tracking-widest text-orange mt-1">{emails?.length || 0} UNREAD EMAILS</p>
							</div>
						</div>
						<Link
							to="emails"
							className="w-full flex items-center justify-center px-8 py-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 font-black uppercase tracking-widest text-[10px] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
						>
							VIEW INBOX
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
