import { motion as Motion } from "framer-motion";
import {
	HiArrowRight,
	HiPaperAirplane,
	HiEnvelope,
	HiPhone,
	HiMapPin,
} from "react-icons/hi2";

const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
		},
	},
};

const Hero = () => {
	return (
		<Motion.section
			id="home"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={sectionVariants}
			className="relative min-h-[calc(100dvh-65px)] flex flex-col items-center justify-center pt-10 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-[#fafafa] dark:bg-gray-950"
		>
			{/* Enhanced Background with Grid and Radial Glow */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				{/* The Grid Pattern */}
				<div
					className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] text-black dark:text-white"
					style={{
						backgroundImage: `
							linear-gradient(to right, currentColor 1px, transparent 1px),
							linear-gradient(to bottom, currentColor 1px, transparent 1px)
						`,
						backgroundSize: "40px 40px",
					}}
				></div>

				{/* Center Radial Glow - matching the orange theme */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] max-h-[600px] md:max-w-[800px] md:max-h-[800px] bg-orange/5 dark:bg-orange/5 blur-[100px] md:blur-[150px] rounded-full opacity-50"></div>
			</div>

			<div className="container mx-auto px-4 text-center relative z-10">
				{/* Availability Badge */}
				<Motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 mb-8 shadow-sm"
				>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
					</span>
					<span className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
						Available for new projects
					</span>
				</Motion.div>

				{/* Name & Title */}
				<Motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-8"
				>
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] dark:text-white mb-2 uppercase tracking-tighter">
						Mohamed Rafat
					</h1>
					<h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-orange uppercase tracking-tighter leading-[0.9]">
						Full Stack Dev
					</h2>
				</Motion.div>

				{/* Description */}
				<Motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
					className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
				>
					Building robust, scalable applications with a focus on seamless user
					experiences and modern architecture.
				</Motion.p>

				{/* Action Buttons */}
				<Motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.5 }}
					className="flex flex-row items-center justify-center gap-4 mb-20"
				>
					<a
						href="#projects"
						className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1a1a1a] dark:bg-white text-white dark:text-gray-900 font-bold transition-all hover:bg-black dark:hover:bg-gray-100 shadow-xl shadow-black/10 active:scale-95"
					>
						View Projects
						<HiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
					</a>
					<a
						href="#contact"
						className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800 shadow-xl shadow-black/5 active:scale-95"
					>
						Contact Me
						<HiPaperAirplane className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
					</a>
				</Motion.div>

				{/* Contact Info Bar */}
				<Motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.6 }}
					className="inline-flex flex-wrap items-center justify-center gap-8 md:gap-12 px-8 py-5 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/3"
				>
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange">
							<HiEnvelope className="text-sm" />
						</div>
						<div className="text-left">
							<p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">
								Email
							</p>
							<p className="text-xs font-bold text-gray-900 dark:text-white">
								mohamed20rafat@gmail.com
							</p>
						</div>
					</div>

					<div className="hidden sm:flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange">
							<HiPhone className="text-sm" />
						</div>
						<div className="text-left">
							<p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">
								Phone
							</p>
							<p className="text-xs font-bold text-gray-900 dark:text-white">
								+20 1050330514
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange">
							<HiMapPin className="text-sm" />
						</div>
						<div className="text-left">
							<p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">
								Location
							</p>
							<p className="text-xs font-bold text-gray-900 dark:text-white">
								Egypt
							</p>
						</div>
					</div>
				</Motion.div>
			</div>
		</Motion.section>
	);
};

export default Hero;
