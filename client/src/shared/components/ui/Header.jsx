import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { HiBars3, HiXMark, HiSun, HiMoon, HiArrowRightOnRectangle, HiUserCircle } from "react-icons/hi2";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import useCurrentUser from "../../../features/auth/hooks/useCurrentUser";
import useLogout from "../../../features/auth/hooks/useLogout";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { isDark, toggleTheme } = useTheme();
	const { pathname } = useLocation();
	const { isAuthenticated, user } = useCurrentUser();
	const { logoutFunc } = useLogout();

	const closeMenu = useCallback(() => setIsOpen(false), []);

	// Close mobile menu when route changes
	useEffect(() => {
		closeMenu();
	}, [pathname, closeMenu]);

	// Prevent scrolling when mobile menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isOpen]);

	const navLinkStyles =
		"transition-all duration-200 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-orange dark:hover:text-orange uppercase tracking-widest";

	const navLinks = [
		{ to: "/#home", label: "Home" },
		{ to: "/#about", label: "About" },
		{ to: "/#projects", label: "Projects" },
		{ to: "/#journey", label: "Journey" },
		{ to: "/#skills", label: "Skills" },
	];

	return (
		<header className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl py-3 md:py-4 sticky top-0 z-50">
			<div className="flex justify-between items-center container mx-auto px-4">
				{/* Logo */}
				<div className="flex items-center">
					<Link to="/">
						<Logo textSize="text-lg md:text-xl" iconSize="text-xl md:text-2xl" />
					</Link>
				</div>

				<nav className="hidden md:flex space-x-6 items-center">
					{navLinks.map((link) => (
						<Motion.div
							key={link.to}
							whileHover={{ y: -1 }}
							whileTap={{ y: 0 }}
						>
							<a href={link.to} className={navLinkStyles}>
								{link.label}
							</a>
						</Motion.div>
					))}

					<div className="flex items-center gap-4 ml-2 border-l border-gray-100 dark:border-gray-800 pl-6">
						<Motion.button
							whileHover={{ scale: 1.1, rotate: 5 }}
							whileTap={{ scale: 0.9 }}
							onClick={toggleTheme}
							className="p-2 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-orange dark:hover:text-orange transition-all shadow-sm"
							aria-label="Toggle theme"
						>
							{isDark ? (
								<HiSun className="text-xl" />
							) : (
								<HiMoon className="text-xl" />
							)}
						</Motion.button>

						{isAuthenticated && (
							<div className="flex items-center gap-4">
								<Link
									to="/adminPanel/profile"
									className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-orange transition-all"
								>
									<HiUserCircle className="text-xl" />
									<span className="hidden lg:inline uppercase tracking-widest">Dashboard</span>
								</Link>
								<button
									onClick={() => logoutFunc()}
									className="p-2 rounded-xl cursor-pointer text-gray-500 hover:text-red-500 transition-all"
									title="Logout"
								>
									<HiArrowRightOnRectangle className="text-xl" />
								</button>
							</div>
						)}
					</div>
				</nav>

				{/* Mobile Controls */}
				<div className="flex items-center gap-2 md:hidden">
					<Motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={toggleTheme}
						className="p-2 rounded-xl cursor-pointer text-gray-600 dark:text-gray-300 hover:text-orange dark:hover:text-orange transition-colors bg-gray-50 dark:bg-gray-800"
						aria-label="Toggle theme"
					>
						{isDark ? (
							<HiSun className="text-xl" />
						) : (
							<HiMoon className="text-xl" />
						)}
					</Motion.button>

					<button
						className="cursor-pointer p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-orange dark:hover:text-orange transition-colors bg-gray-50 dark:bg-gray-800"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle menu"
					>
						{isOpen ? (
							<HiXMark className="text-2xl" />
						) : (
							<HiBars3 className="text-2xl" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Navigation Overlay */}
			<AnimatePresence>
				{isOpen && (
					<Motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "calc(100vh - 65px)" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="fixed inset-0 top-[65px] bg-white dark:bg-gray-900 z-40 md:hidden overflow-y-auto"
					>
						<div className="flex flex-col p-6 space-y-2">
							{navLinks.map((link, index) => (
								<Motion.div
									key={link.to}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.05 }}
								>
									<a
										href={link.to}
										className="block p-4 rounded-2xl text-lg font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-orange transition-all uppercase tracking-widest"
										onClick={closeMenu}
									>
										{link.label}
									</a>
								</Motion.div>
							))}
							<Motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: navLinks.length * 0.05 }}
								className="pt-4"
							>
							<div className="pt-6 border-t border-gray-100 dark:border-gray-800 mt-4 space-y-4">
								{isAuthenticated && (
									<>
										<Link
											to="/adminPanel/profile"
											className="block p-4 rounded-2xl text-lg font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-orange transition-all uppercase tracking-widest"
											onClick={closeMenu}
										>
											Dashboard
										</Link>
										<button
											onClick={() => {
												logoutFunc();
												closeMenu();
											}}
											className="block w-full p-4 rounded-2xl text-lg font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all uppercase tracking-widest text-left"
										>
											Logout
										</button>
									</>
								)}
							</div>
							</Motion.div>
						</div>
					</Motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Header;
