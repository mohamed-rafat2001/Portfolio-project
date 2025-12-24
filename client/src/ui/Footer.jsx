import Logo from "./Logo";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion as Motion } from "framer-motion";

const Footer = () => {
	const socialLinks = [
		{
			icon: <FaGithub />,
			href: "https://github.com/mohamed-rafat2001",
			label: "GitHub",
		},
		{
			icon: <FaLinkedin />,
			href: "https://www.linkedin.com/in/mohamed-rafat-19046b229",
			label: "LinkedIn",
		},
	];

	return (
		<footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-12">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center gap-10">
					{/* Logo - Left */}
					<div className="flex-1 flex justify-start">
						<Logo iconSize="text-2xl" textSize="text-xl" />
					</div>

					{/* Copyright - Middle */}
					<div className="flex-1 flex justify-center text-center">
						<p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">
							© {new Date().getFullYear()} MOHAMED RAFAT. ALL RIGHTS RESERVED.
						</p>
					</div>

					{/* Social Links - Right */}
					<div className="flex-1 flex justify-end">
						<div className="flex gap-4">
							{socialLinks.map((social) => (
								<Motion.a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ y: -3, scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg text-gray-600 dark:text-gray-400 hover:text-orange dark:hover:text-orange transition-all"
									aria-label={social.label}
								>
									{social.icon}
								</Motion.a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
