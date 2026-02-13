import { m as Motion } from "framer-motion";
import {
	HiArrowRight,
	HiPaperAirplane,
	HiEnvelope,
	HiPhone,
	HiMapPin,
} from "react-icons/hi2";
import useAdminInfo from "../../../shared/hooks/useAdminInfo";

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
	const { admin } = useAdminInfo();

	return (
		<Motion.section
			id="home"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={sectionVariants}
			className="relative min-h-[calc(100dvh-65px)] flex flex-col items-center justify-center pt-10 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-white dark:bg-[#030712] transition-colors duration-500"
		>
			{/* Enhanced Background with Grid and Radial Glow */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				{/* The Grid Pattern */}
				<div
					className="absolute inset-0 opacity-[0.05] text-gray-900 dark:text-white"
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
					className="inline-flex flex-wrap items-center justify-center gap-4 mb-12"
				>
					<div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-xl backdrop-blur-sm">
						<span className="relative flex h-2 w-2">
							<span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${admin?.moreInfo?.available !== false ? "bg-green-400" : "bg-red-400"} opacity-75`}></span>
							<span className={`relative inline-flex rounded-full h-2 w-2 ${admin?.moreInfo?.available !== false ? "bg-green-500" : "bg-red-500"}`}></span>
						</span>
						<span className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-[0.3em]">
							{admin?.moreInfo?.available !== false ? "Available for new projects" : "Currently busy"}
						</span>
					</div>

					{admin?.moreInfo?.location && (
						<div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-xl backdrop-blur-sm">
							<HiMapPin className="text-orange text-sm" />
							<span className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-[0.3em]">
								{admin.moreInfo.location}
							</span>
						</div>
					)}
				</Motion.div>

				{/* Name & Title */}
				<Motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-10 space-y-4"
				>
					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
						{admin?.name || "Mohamed Rafat"}
					</h1>
					<h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-orange uppercase tracking-tighter leading-[0.85]">
						{admin?.moreInfo?.job?.title || "Full Stack Dev"}
					</h2>
				</Motion.div>

				{/* Job Note / Description */}
				<Motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
					className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
				>
					{admin?.moreInfo?.job?.note || "Building robust, scalable applications with a focus on seamless user experiences and modern architecture."}
				</Motion.p>

				{/* Action Buttons */}
				<Motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.5 }}
					className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
				>
					<a
						href="#projects"
						className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gray-50 dark:bg-white text-gray-900 font-black uppercase tracking-widest transition-all hover:bg-orange hover:text-white shadow-xl dark:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] active:scale-95"
					>
						View Projects
						<HiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
					</a>
					<a
						href="#contact"
						className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gray-900 dark:bg-gray-900 border border-gray-800 text-white font-black uppercase tracking-widest transition-all hover:bg-gray-800 shadow-xl active:scale-95"
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
					className="inline-flex flex-wrap items-center justify-center gap-10 md:gap-16 px-10 py-7 rounded-[2.5rem] bg-gray-50 dark:bg-[#0a0f1c] border border-gray-100 dark:border-gray-800/50 shadow-xl"
				>
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-orange">
							<HiEnvelope className="text-xl" />
						</div>
						<div className="text-left">
							<p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
								Email
							</p>
							<a href={`mailto:${admin?.email || "mohamed20rafat@gmail.com"}`} className="text-sm font-bold text-gray-900 dark:text-white hover:text-orange transition-colors">
								{admin?.email || "mohamed20rafat@gmail.com"}
							</a>
						</div>
					</div>

					<div className="hidden sm:flex items-center gap-4">
						<div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-orange">
							<HiPhone className="text-xl" />
						</div>
						<div className="text-left">
							<p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
								Phone
							</p>
							<a href={`tel:${admin?.phoneNumber || "+201050330514"}`} className="text-sm font-bold text-gray-900 dark:text-white hover:text-orange transition-colors">
								{admin?.phoneNumber || "+20 1050330514"}
							</a>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-orange">
							<HiMapPin className="text-xl" />
						</div>
						<div className="text-left">
							<p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
								Location
							</p>
							<p className="text-sm font-bold text-gray-900 dark:text-white">
								{admin?.moreInfo?.location || "Egypt"}
							</p>
						</div>
					</div>
				</Motion.div>
			</div>
		</Motion.section>
	);
};

export default Hero;
