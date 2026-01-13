import { Outlet, NavLink } from "react-router-dom";
import {
	HiOutlineUser,
	HiOutlineBriefcase,
	HiOutlineAcademicCap,
	HiOutlineRocket,
	HiOutlineWrench,
	HiOutlineEnvelope,
	HiOutlineArrowLeftOnRectangle,
	HiBars3BottomLeft,
	HiXMark,
} from "react-icons/hi2";
import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import ScrollToTop from "../ui/ScrollToTop.jsx";
import Logo from "../ui/Logo.jsx";
import useLogout from "../features/auth/hooks/useLogout";

const navLinks = [
	{ to: "profile", label: "Profile", icon: HiOutlineUser },
	{ to: "projects", label: "Projects", icon: HiOutlineRocket },
	{ to: "experiences", label: "Experiences", icon: HiOutlineBriefcase },
	{ to: "educations", label: "Educations", icon: HiOutlineAcademicCap },
	{ to: "skills", label: "Skills", icon: HiOutlineWrench },
	{ to: "emails", label: "Messages", icon: HiOutlineEnvelope },
];

const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const { logoutFunc } = useLogout();

	return (
		<div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex">
			{/* Sidebar */}
			<aside
				className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="h-full flex flex-col p-6">
					<div className="mb-10 px-2 flex items-center justify-between">
						<Logo textSize="text-xl" iconSize="text-2xl" />
						<button
							onClick={() => setIsSidebarOpen(false)}
							className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
						>
							<HiXMark className="text-xl" />
						</button>
					</div>

					<nav className="flex-1 space-y-2">
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								className={({ isActive }) => `
									flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all
									${
										isActive
											? "bg-orange text-white shadow-lg shadow-orange/20"
											: "text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
									}
								`}
							>
								<link.icon className="text-lg" />
								{link.label}
							</NavLink>
						))}
					</nav>

					<div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
						<button
							onClick={logoutFunc}
							className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
						>
							<HiOutlineArrowLeftOnRectangle className="text-lg" />
							Logout
						</button>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Mobile Header */}
				<header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
					<button
						onClick={() => setIsSidebarOpen(true)}
						className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
					>
						<HiBars3BottomLeft className="text-2xl" />
					</button>
					<Logo textSize="text-lg" iconSize="text-xl" />
					<div className="w-10" /> {/* Spacer */}
				</header>

				<main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
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
