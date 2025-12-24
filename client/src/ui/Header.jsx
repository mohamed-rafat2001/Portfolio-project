import { useState, useEffect, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
	HiCodeBracket,
	HiBars3,
	HiXMark,
	HiSun,
	HiMoon,
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

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
		setIsDark(!isDark);
		if (!isDark) {
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

	const navLinkStyles = ({ isActive }) =>
		`transition-colors duration-200 text-xl md:text-base font-medium ${
			isActive
				? "text-orange font-semibold"
				: "text-gray-600 dark:text-gray-300 hover:text-orange dark:hover:text-orange"
		}`;

	const navLinks = [
		{ to: "/", label: "Home", end: true },
		{ to: "/about", label: "About" },
		{ to: "/projects", label: "Projects" },
		{ to: "/skills", label: "Skills" },
		{ to: "/educations", label: "Educations" },
		{ to: "/experiences", label: "Experiences" },
		{ to: "/contact", label: "Contact" },
	];

	return (
		<header className="md:py-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow py-4 sticky top-0 z-50 transition-colors duration-300">
			<div className="flex justify-between items-center container mx-auto px-4">
				{/* Logo */}
				<div className="flex items-center">
					<Link to="/" className="flex items-center gap-2 group">
						<motion.div
							initial={{ rotate: -10 }}
							animate={{ rotate: 0 }}
							whileHover={{ scale: 1.1, rotate: 5 }}
							whileTap={{ scale: 0.9 }}
							transition={{ duration: 0.3 }}
						>
							<HiCodeBracket className="text-2xl md:text-3xl text-orange" />
						</motion.div>
						<h1 className="text-xl md:text-2xl font-extrabold tracking-tight dark:text-white">
							MOHAMED <span className="text-orange">RAFAT</span>
						</h1>
					</Link>
				</div>

				<nav className="hidden md:flex space-x-8 items-center">
					{navLinks
						.filter((link) => link.label !== "Contact")
						.map((link) => (
							<motion.div
								key={link.to}
								whileHover={{ y: -2 }}
								whileTap={{ y: 0 }}
							>
								<NavLink to={link.to} end={link.end} className={navLinkStyles}>
									{link.label}
								</NavLink>
							</motion.div>
						))}

					<div className="flex items-center gap-4 ml-4">
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={toggleTheme}
							className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-orange dark:hover:text-orange transition-colors"
							aria-label="Toggle theme"
						>
							{isDark ? (
								<HiSun className="text-2xl" />
							) : (
								<HiMoon className="text-2xl" />
							)}
						</motion.button>

						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								to="/contact"
								className="bg-orange text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-orange/20 hover:shadow-orange/40 transition-shadow duration-300"
							>
								Contact
							</Link>
						</motion.div>
					</div>
				</nav>

				{/* Mobile Menu Button */}
				<div className="flex items-center gap-2 md:hidden">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={toggleTheme}
						className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-orange dark:hover:text-orange transition-colors"
						aria-label="Toggle theme"
					>
						{isDark ? (
							<HiSun className="text-2xl" />
						) : (
							<HiMoon className="text-2xl" />
						)}
					</motion.button>

					<button
						className="cursor-pointer p-2 text-gray-600 dark:text-gray-300 hover:text-orange dark:hover:text-orange transition-colors"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle menu"
					>
						{isOpen ? (
							<HiXMark className="text-3xl" />
						) : (
							<HiBars3 className="text-3xl" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Navigation Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, x: "100%" }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed inset-0 top-[73px] bg-white dark:bg-gray-900 z-40 md:hidden flex flex-col p-6 space-y-6 transition-colors duration-300"
					>
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.end}
								className={navLinkStyles}
								onClick={closeMenu}
							>
								{link.label}
							</NavLink>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Header;
