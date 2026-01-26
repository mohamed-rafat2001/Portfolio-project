import { motion as Motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import profileImg from "../../../shared/assets/profissionalMe.png";
import useAdminInfo from "../../../shared/hooks/useAdminInfo";

import LoadingState from "../../../shared/components/ui/LoadingState";

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

const About = () => {
	const { admin, isLoading } = useAdminInfo();

	if (isLoading) return <LoadingState message="Loading about info..." />;

	return (
		<Motion.section
			id="about"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-white dark:bg-[#030712] overflow-hidden transition-colors duration-500"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-24">
					<span className="text-orange font-black text-sm uppercase tracking-[0.4em]">
						01
					</span>
					<div className="h-px grow bg-gray-200 dark:bg-gray-800/50"></div>
					<h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
						About <span className="text-orange">Me</span>
					</h2>
				</div>

				<div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center">
					{/* Image Section */}
					<div className="flex-1 w-full max-w-md lg:max-w-none relative group">
						<div className="relative">
							{/* Background Decorative Elements */}
							<div className="absolute -inset-6 bg-orange/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
							<div className="absolute -inset-4 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-2xl"></div>

							<div className="relative aspect-square rounded-[3rem] bg-gray-50 dark:bg-[#0a0f1c] overflow-hidden border-8 border-gray-50 dark:border-[#0a0f1c] shadow-2xl">
								<img
									src={admin?.profileImg?.secure_url || profileImg}
									alt={admin?.name || "Mohamed Rafat"}
									className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
									crossOrigin="anonymous"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 dark:from-[#030712]/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700"></div>
							</div>
						</div>
					</div>

					{/* Text Content */}
					<div className="flex-1 space-y-10">
						<div className="space-y-4">
							<h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
								Hello, I'm<br />
								<span className="text-orange">{admin?.name || "Mohamed Rafat"}</span>.
							</h3>
						</div>

						<div className="space-y-8 text-gray-500 dark:text-gray-400">
							<div className="text-lg md:text-xl leading-relaxed font-medium">
								{admin?.infos?.aboutMe?.message ? (
									<p>{admin.infos.aboutMe.message}</p>
								) : (
									<p>
										I am a dedicated Full Stack Developer with a deep passion for creating seamless digital experiences.
										My journey began with a curiosity for how things work on the web, which quickly evolved into a career building robust applications.
										With a strong foundation in both frontend and backend technologies, I enjoy bridging the gap between design and technical implementation.
										I thrive in collaborative environments where I can solve complex problems and contribute to innovative solutions.
									</p>
								)}
							</div>
							
							</div>

						<div className="pt-4">
							<a
								href="#contact"
								className="group inline-flex items-center gap-4 text-orange font-black uppercase tracking-[0.3em] text-[11px] hover:gap-6 transition-all bg-orange/5 px-8 py-4 rounded-full border border-orange/10 hover:bg-orange/10"
							>
								Let's Talk
								<HiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</Motion.section>
	);
};

export default About;
