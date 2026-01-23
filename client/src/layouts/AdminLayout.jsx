import { Outlet, NavLink } from "react-router-dom";
import {
	HiOutlineSquares2X2,
	HiOutlineUser,
	HiOutlineBriefcase,
	HiOutlineAcademicCap,
	HiOutlineRocketLaunch,
	HiOutlineWrenchScrewdriver,
	HiOutlineEnvelope,
	HiOutlineArrowLeftOnRectangle,
	HiOutlineBell,
	HiOutlineMoon,
	HiOutlineSun,
	HiBars3BottomLeft,
	HiXMark,
	HiChevronLeft,
} from "react-icons/hi2";
import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import ScrollToTop from "../ui/ScrollToTop.jsx";
import Logo from "../ui/Logo.jsx";
import useLogout from "../features/auth/hooks/useLogout";
import useCurrentUser from "../hooks/useCurrentUser";

const navLinks = [
	{ to: "dashboard", label: "Dashboard", icon: HiOutlineSquares2X2 },
	{ to: "profile", label: "Profile", icon: HiOutlineUser },
	{ to: "projects", label: "Projects", icon: HiOutlineRocketLaunch },
	{ to: "experiences", label: "Experiences", icon: HiOutlineBriefcase },
	{ to: "educations", label: "Educations", icon: HiOutlineAcademicCap },
	{ to: "skills", label: "Skills", icon: HiOutlineWrenchScrewdriver },
	{ to: "emails", label: "Emails", icon: HiOutlineEnvelope },
];

const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(
		localStorage.getItem("theme") === "dark" || 
		(!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
	);
	const { logoutFunc } = useLogout();
	const { user } = useCurrentUser();

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	return (
		<div className="min-h-screen bg-[#fafafa] dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex transition-colors duration-300">
			{/* Sidebar */}
			<aside
				className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#030712] border-r border-gray-100 dark:border-gray-800/50 transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="h-full flex flex-col p-8">
					<div className="mb-12 px-2 flex items-center justify-between">
						<Logo textSize="text-xl" iconSize="text-2xl" />
						<button
							onClick={() => setIsSidebarOpen(false)}
							className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
						>
							<HiXMark className="text-xl" />
						</button>
					</div>

					<nav className="flex-1 space-y-3">
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								className={({ isActive }) => `
									flex items-center gap-4 px-6 py-4 rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300
									${
										isActive
											? "bg-orange text-white shadow-2xl shadow-orange/20"
											: "text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
									}
								`}
							>
								<link.icon className={`text-lg ${isActive ? "text-white" : "text-gray-400"}`} />
								{link.label}
							</NavLink>
						))}
					</nav>

					<div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800/50">
						<button
							onClick={logoutFunc}
							className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 group"
						>
							<div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
								<HiOutlineArrowLeftOnRectangle className="text-lg" />
							</div>
							Logout
						</button>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-w-0 relative bg-white dark:bg-[#030712]">
				{/* Header */}
				<header className="flex items-center justify-between p-6 md:px-10 lg:px-16 bg-white/80 dark:bg-[#030712] backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800/50">
					<div className="flex items-center gap-6">
						<button
							onClick={() => setIsSidebarOpen(true)}
							className={`p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all ${isSidebarOpen ? 'lg:hidden' : 'flex'}`}
						>
							<HiBars3BottomLeft className="text-2xl" />
						</button>
						
						<span className="hidden md:block text-xs font-black uppercase tracking-[0.5em] text-gray-400">
							{window.location.pathname.split("/").pop()}
						</span>
					</div>

					<div className="flex items-center gap-4 md:gap-8">
						<div className="flex items-center gap-2">
							<button 
								onClick={() => setIsDarkMode(!isDarkMode)}
								className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-orange transition-colors"
							>
								{isDarkMode ? <HiOutlineSun className="text-xl" /> : <HiOutlineMoon className="text-xl" />}
							</button>
							<button className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-orange transition-colors relative">
								<HiOutlineBell className="text-xl" />
								<span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange rounded-full border-2 border-white dark:border-gray-900" />
							</button>
						</div>

						<div className="flex items-center gap-4">
							<div className="hidden md:block text-right">
								<p className="text-[11px] font-black uppercase tracking-tight text-gray-900 dark:text-white">{user?.name}</p>
								<p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Administrator</p>
							</div>
							<div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
								<img src={user?.profileImg || "/default-user.jpg"} alt={user?.name} className="w-full h-full object-cover" />
							</div>
						</div>
					</div>
				</header>

				<main className="flex-1 p-6 md:p-10 lg:p-16 overflow-y-auto custom-scrollbar">
					<div className="max-w-6xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>

			<ScrollToTop />
		</div>
	);
};
export default AdminLayout;
