import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { HiBars3, HiXMark, HiSun, HiMoon } from "react-icons/hi2";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const { pathname } = useLocation();

	// Initialize theme from localStorage or system preference
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		const systemPrefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
			setIsDark(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleTheme = () => {
		const newDark = !isDark;
		setIsDark(newDark);
		if (newDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};

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
		{ to: "#home", label: "Home" },
		{ to: "#about", label: "About" },
		{ to: "#projects", label: "Projects" },
		{ to: "#journey", label: "Journey" },
		{ to: "#skills", label: "Skills" },
	];

	return (
		<header className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl py-3 md:py-4 sticky top-0 z-50">
			<div className="flex justify-between items-center container mx-auto px-4">
				{/* Logo */}
				<div className="flex items-center">
					<Logo textSize="text-lg md:text-xl" iconSize="text-xl md:text-2xl" />
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

					<div className="flex items-center gap-4 ml-2">
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

						<Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<a
								href="#contact"
								className="bg-orange text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-orange/20 hover:shadow-orange/40 transition-all duration-300 uppercase tracking-widest border-b-2 border-orange-600 active:border-b-0"
							>
								Contact Me
							</a>
						</Motion.div>
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
								<a
									href="#contact"
									className="block w-full bg-orange text-white px-6 py-5 rounded-2xl text-center font-black uppercase tracking-widest shadow-xl shadow-orange/20 text-lg"
									onClick={closeMenu}
								>
									Contact Me
								</a>
							</Motion.div>
						</div>
					</Motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Header;
