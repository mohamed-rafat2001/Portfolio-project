import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
	HiArrowRight,
	HiPaperAirplane,
	HiEnvelope,
	HiPhone,
	HiMapPin,
} from "react-icons/hi2";
import useAdminInfo from "../../../hooks/useAdminInfo";

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

<<<<<<< HEAD
const Hero = () => {
	const { admin } = useAdminInfo();

=======
const Hero = ({ user }) => {
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
	return (
		<Motion.section
			id="home"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={sectionVariants}
<<<<<<< HEAD
			className="relative min-h-[calc(100dvh-65px)] flex flex-col items-center justify-center pt-10 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-[#030712]"
=======
			className="relative min-h-[calc(100dvh-65px)] flex flex-col items-center justify-center pt-4 pb-8 md:pt-6 md:pb-12 overflow-hidden bg-[#fafafa] dark:bg-gray-950"
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
		>
			{/* Enhanced Background with Grid and Radial Glow */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				{/* The Grid Pattern */}
				<div
					className="absolute inset-0 opacity-[0.05] text-white"
					style={{
						backgroundImage: `
							linear-gradient(to right, currentColor 1px, transparent 1px),
							linear-gradient(to bottom, currentColor 1px, transparent 1px)
						`,
						backgroundSize: "60px 60px",
					}}
				></div>

				{/* Center Radial Glow - matching the orange theme */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-orange/10 blur-[150px] rounded-full opacity-50"></div>
			</div>

			<div className="container mx-auto px-4 text-center relative z-10">
				{/* Availability & Location Badge */}
				<Motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
<<<<<<< HEAD
					className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-900/50 border border-gray-800 mb-12 shadow-2xl backdrop-blur-sm"
				>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
					</span>
					<span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
						Available for new projects
					</span>
=======
					className="inline-flex flex-wrap items-center justify-center gap-4 mb-8"
				>
					<div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
						<span className="relative flex h-2 w-2">
							<span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${user?.infos?.available !== false ? "bg-green-400" : "bg-red-400"} opacity-75`}></span>
							<span className={`relative inline-flex rounded-full h-2 w-2 ${user?.infos?.available !== false ? "bg-green-500" : "bg-red-500"}`}></span>
						</span>
						<span className="text-[10px] md:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
							{user?.infos?.available !== false ? "Available for new projects" : "Currently busy"}
						</span>
					</div>

					{user?.infos?.location && (
						<div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
							<HiMapPin className="text-orange text-sm" />
							<span className="text-[10px] md:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
								{user.infos.location}
							</span>
						</div>
					)}
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
				</Motion.div>

				{/* Name & Title */}
				<Motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-10 space-y-4"
				>
<<<<<<< HEAD
					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter">
						{admin?.name || "Mohamed Rafat"}
					</h1>
					<h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-orange uppercase tracking-tighter leading-[0.85]">
						{admin?.aboutMe?.job?.title || "Full Stack Dev"}
=======
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] dark:text-white mb-2 uppercase tracking-tighter">
						{user?.name || "Mohamed Rafat"}
					</h1>
					<h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-orange uppercase tracking-tighter leading-[0.9]">
						{user?.infos?.job?.title || "Full Stack Dev"}
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
					</h2>
				</Motion.div>

				{/* Job Note / Description */}
				<Motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
<<<<<<< HEAD
					className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
				>
					{admin?.aboutMe?.job?.note || "Building robust, scalable applications with a focus on seamless user experiences and modern architecture."}
=======
					className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium px-4"
				>
					{user?.infos?.job?.note || user?.infos?.aboutMe?.message || "I am a dedicated Full Stack Developer with a deep passion for creating seamless digital experiences. My journey began with a curiosity for how things work on the web, which quickly evolved into a career building robust applications."}
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
				</Motion.p>

				{/* Action Buttons */}
				<Motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.5 }}
<<<<<<< HEAD
					className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
				>
					<a
						href="#projects"
						className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-gray-900 font-black uppercase tracking-widest transition-all hover:bg-orange hover:text-white shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] active:scale-95"
=======
					className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
				>
					<Link
						to="/projects"
						className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1a1a1a] dark:bg-white text-white dark:text-gray-900 font-bold transition-all hover:bg-black dark:hover:bg-gray-100 shadow-xl shadow-black/10 active:scale-95"
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
					>
						View Projects
						<HiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
					</Link>
					<a
						href="#contact"
<<<<<<< HEAD
						className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gray-900 border border-gray-800 text-white font-black uppercase tracking-widest transition-all hover:bg-gray-800 shadow-2xl active:scale-95"
=======
						className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800 shadow-xl shadow-black/5 active:scale-95"
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
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
<<<<<<< HEAD
					className="inline-flex flex-wrap items-center justify-center gap-10 md:gap-16 px-10 py-7 rounded-[2.5rem] bg-[#0a0f1c] border border-gray-800/50 shadow-2xl"
				>
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-orange">
							<HiEnvelope className="text-xl" />
=======
					className="inline-flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 px-6 sm:px-8 py-5 rounded-3xl sm:rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/3 w-full sm:w-auto"
				>
					<div className="flex items-center gap-3 w-full sm:w-auto">
						<div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange shrink-0">
							<HiEnvelope className="text-sm" aria-hidden="true" />
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
						</div>
						<div className="text-left">
							<p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
								Email
							</p>
<<<<<<< HEAD
							<p className="text-sm font-bold text-white">
								mohamed20rafat@gmail.com
							</p>
						</div>
					</div>

					<div className="hidden sm:flex items-center gap-4">
						<div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-orange">
							<HiPhone className="text-xl" />
=======
							<a href={`mailto:${user?.email || "mohamed20rafat@gmail.com"}`} className="text-xs font-bold text-gray-900 dark:text-white hover:text-orange transition-colors">
								{user?.email || "mohamed20rafat@gmail.com"}
							</a>
						</div>
					</div>

					<div className="flex items-center gap-3 w-full sm:w-auto">
						<div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange shrink-0">
							<HiPhone className="text-sm" aria-hidden="true" />
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
						</div>
						<div className="text-left">
							<p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
								Phone
							</p>
<<<<<<< HEAD
							<p className="text-sm font-bold text-white">
								+20 1050330514
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-orange">
							<HiMapPin className="text-xl" />
=======
							<a href={`tel:${user?.phoneNumber || "+201050330514"}`} className="text-xs font-bold text-gray-900 dark:text-white hover:text-orange transition-colors">
								{user?.phoneNumber || "+20 1050330514"}
							</a>
						</div>
					</div>

					<div className="flex items-center gap-3 w-full sm:w-auto">
						<div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange shrink-0">
							<HiMapPin className="text-sm" aria-hidden="true" />
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
						</div>
						<div className="text-left">
							<p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
								Location
							</p>
<<<<<<< HEAD
							<p className="text-sm font-bold text-white">
								Egypt
=======
							<p className="text-xs font-bold text-gray-900 dark:text-white">
								{user?.infos?.location || "Egypt"}
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
							</p>
						</div>
					</div>
				</Motion.div>
			</div>
		</Motion.section>
	);
};

export default Hero;
