import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
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
<<<<<<< HEAD
=======
	HiChevronRight,
	HiOutlineBell,
	HiSun,
	HiMoon,
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
} from "react-icons/hi2";
import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import ScrollToTop from "../shared/components/ui/ScrollToTop.jsx";
import Logo from "../shared/components/ui/Logo.jsx";
import useLogout from "../features/auth/hooks/useLogout";
<<<<<<< HEAD
import useCurrentUser from "../hooks/useCurrentUser";
=======
import useCurrentUser from "../features/auth/hooks/useCurrentUser";
import { useTheme } from "../shared/context/ThemeContext";
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41

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
<<<<<<< HEAD
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
=======
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const { logoutFunc } = useLogout();
	const { user } = useCurrentUser();
	const { isDark, toggleTheme } = useTheme();
	const location = useLocation();

	// Close mobile sidebar on route change
	useEffect(() => {
		setIsSidebarOpen(false);
	}, [location]);

	const currentRoute = navLinks.find(link => location.pathname.includes(link.to))?.label || "Admin Panel";

	return (
		<div className="h-screen bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex overflow-hidden">
			{/* Mobile Sidebar Overlay */}
			<AnimatePresence>
				{isSidebarOpen && (
					<Motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsSidebarOpen(false)}
						className="fixed inset-0 z-[60] bg-gray-950/60 backdrop-blur-sm lg:hidden"
					/>
				)}
			</AnimatePresence>

			{/* Sidebar */}
			<aside
				className={`fixed inset-y-0 left-0 z-[70] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 lg:static lg:relative lg:translate-x-0 ${
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} ${isCollapsed ? "lg:w-20" : "lg:w-72"}`}
			>
<<<<<<< HEAD
				<div className="h-full flex flex-col p-8">
					<div className="mb-12 px-2 flex items-center justify-between">
						<Logo textSize="text-xl" iconSize="text-2xl" />
=======
				<div className={`h-full flex flex-col relative transition-all duration-300 ${isCollapsed ? "p-2" : "p-6"}`}>
					{/* Desktop Collapse Toggle */}
					<button
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="hidden lg:flex absolute -right-4 top-10 z-10 w-8 h-8 items-center justify-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full shadow-md text-gray-500 hover:text-orange transition-all cursor-pointer hover:scale-110"
					>
						{isCollapsed ? <HiChevronRight className="text-sm" /> : <HiChevronLeft className="text-sm" />}
					</button>

					<div className={`mb-10 flex items-center transition-all duration-300 ${isCollapsed ? "justify-center" : "justify-between px-2"}`}>
						<Link to="/" className="flex items-center cursor-pointer">
							<Logo textSize={isCollapsed ? "hidden" : "text-xl"} iconSize="text-2xl" />
						</Link>
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
						<button
							onClick={() => setIsSidebarOpen(false)}
							className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer"
						>
							<HiXMark className="text-xl" />
						</button>
					</div>

<<<<<<< HEAD
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
=======
					<nav className={`flex-1 space-y-4 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
						{navLinks.map((link) => {
							const Icon = link.icon;
							return (
								<NavLink
									key={link.to}
									to={link.to}
									className={({ isActive }) => `
										flex items-center rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all relative group cursor-pointer
										${
											isActive
												? "bg-orange text-white shadow-lg shadow-orange/20"
												: "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
										}
										${isCollapsed ? "w-12 h-12 justify-center" : "px-6 py-4 gap-4 w-full"}
									`}
								>
									<Icon className={`text-xl transition-transform ${!isCollapsed ? "group-hover:scale-110" : ""}`} />
									{!isCollapsed && <span>{link.label}</span>}
									
									{/* Tooltip for collapsed state */}
									{isCollapsed && (
										<div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
											{link.label}
										</div>
									)}
								</NavLink>
							);
						})}
					</nav>

					<div className={`mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 ${isCollapsed ? "flex justify-center" : ""}`}>
						<button
							onClick={logoutFunc}
							className={`flex items-center rounded-2xl font-black uppercase tracking-widest text-[10px] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-pointer group relative ${
								isCollapsed ? "w-12 h-12 justify-center" : "px-6 py-4 gap-4 w-full"
							}`}
						>
							<HiOutlineArrowLeftOnRectangle className="text-xl group-hover:scale-110 transition-transform" />
							{!isCollapsed && <span>Logout</span>}
							
							{isCollapsed && (
								<div className="absolute left-full ml-4 px-3 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
									Logout
								</div>
							)}
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
						</button>
					</div>
				</div>
			</aside>

			{/* Main Content */}
<<<<<<< HEAD
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
=======
			<div className="flex-1 flex flex-col min-w-0 h-screen">
				{/* Top Header */}
				<header className="flex items-center justify-between px-8 h-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
					<div className="flex items-center gap-4">
						<button
							onClick={() => setIsSidebarOpen(true)}
							className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer"
						>
							<HiBars3BottomLeft className="text-2xl" />
						</button>
						<h2 className="text-sm font-black uppercase tracking-widest text-gray-400">
							{currentRoute}
						</h2>
					</div>

					<div className="flex items-center gap-4">
						<Motion.button
							whileHover={{ scale: 1.1, rotate: 5 }}
							whileTap={{ scale: 0.9 }}
							onClick={toggleTheme}
							className="p-2.5 rounded-xl cursor-pointer bg-white dark:bg-gray-900 text-gray-500 hover:text-orange transition-all border border-gray-100 dark:border-gray-800 shadow-sm"
							aria-label="Toggle theme"
						>
							{isDark ? (
								<HiSun className="text-xl" />
							) : (
								<HiMoon className="text-xl" />
							)}
						</Motion.button>

						<button className="relative p-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
							<HiOutlineBell className="text-xl" />
							<span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange rounded-full border-2 border-white dark:border-gray-900" />
						</button>
						
						<div className="h-8 w-[1px] bg-gray-100 dark:bg-gray-800 mx-2" />

						<div className="flex items-center gap-3">
							<div className="text-right hidden sm:block">
								<p className="text-xs font-black uppercase tracking-tight text-gray-900 dark:text-white leading-none">
									{user?.name}
								</p>
								<p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
									Administrator
								</p>
							</div>
							<div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-950 shadow-sm">
								<img
									src={user?.infos?.profileImg?.secure_url || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
									alt={user?.name}
									className="w-full h-full object-cover"
								/>
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
							</div>
						</div>
					</div>
				</header>

<<<<<<< HEAD
				<main className="flex-1 p-6 md:p-10 lg:p-16 overflow-y-auto custom-scrollbar">
=======
				<main className="flex-1 overflow-y-auto bg-[#fafafa] dark:bg-gray-950 p-6 md:p-10 lg:p-12 custom-scrollbar">
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
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
