import { motion as Motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
<<<<<<< HEAD
import profileImg from "../../../assets/profissionalMe.png";
import useAdminInfo from "../../../hooks/useAdminInfo";
import LoadingState from "../../../shared/components/ui/LoadingState";
=======
import profileImg from "../../../shared/assets/profissionalMe.png";
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41

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
const About = () => {
	const { admin, isLoading } = useAdminInfo();

	if (isLoading) return <LoadingState message="Loading about info..." />;

=======
const About = ({ user }) => {
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
	return (
		<Motion.section
			id="about"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={sectionVariants}
<<<<<<< HEAD
			className="py-24 md:py-32 bg-[#030712] overflow-hidden"
=======
			className="py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden"
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-24">
					<span className="text-orange font-black text-sm uppercase tracking-[0.4em]">
						01
					</span>
					<div className="h-px grow bg-gray-800/50"></div>
					<h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
						About <span className="text-orange">Me</span>
					</h2>
				</div>

				<div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center">
					{/* Image Section */}
					<div className="flex-1 w-full max-w-md lg:max-w-none relative group">
						<div className="relative">
							{/* Background Decorative Elements */}
							<div className="absolute -inset-6 bg-orange/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
							<div className="absolute -inset-4 bg-gray-900 border border-gray-800 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-2xl"></div>

							<div className="relative aspect-square rounded-[3rem] bg-[#0a0f1c] overflow-hidden border-8 border-[#0a0f1c] shadow-2xl">
								<img
<<<<<<< HEAD
									src={admin?.profileImg?.secure_url || profileImg}
									alt={admin?.name || "Mohamed Rafat"}
									className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
=======
									src={user?.infos?.profileImg?.secure_url || profileImg}
									alt={user?.name || "Mohamed Rafat"}
									className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700"></div>
							</div>
						</div>
					</div>

					{/* Text Content */}
<<<<<<< HEAD
					<div className="flex-1 space-y-10">
						<div className="space-y-6">
							<h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
								{admin?.aboutMe?.title || (
									<>
										I build <span className="text-orange">digital products</span> that users love.
									</>
								)}
							</h3>
						</div>

						<div className="space-y-8 text-gray-400">
							<div className="text-xl md:text-2xl leading-relaxed font-medium">
								{admin?.aboutMe?.note ? (
									<p>{admin.aboutMe.note}</p>
								) : (
									<p>
										I am a dedicated{" "}
										<span className="text-white font-bold underline decoration-orange decoration-4 underline-offset-8">
											Full Stack Developer
										</span>{" "}
										with a deep passion for creating seamless digital experiences.
										I bridge the gap between complex backend systems and intuitive frontend interfaces.
									</p>
								)}
							</div>
							
							<div className="grid grid-cols-2 gap-8 pt-4">
								<div className="space-y-2">
									<p className="text-orange font-black text-3xl">5+</p>
									<p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Years Experience</p>
								</div>
								<div className="space-y-2">
									<p className="text-orange font-black text-3xl">50+</p>
									<p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Projects Done</p>
								</div>
							</div>
=======
					<div className="flex-1 space-y-8">
						<div className="space-y-4">
							<h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] dark:text-white leading-tight">
								{user?.infos?.aboutMe?.title || `Hello, I'm ${user?.name || "Mohamed Rafat"}`}
							</h3>
						</div>

						<div className="space-y-6 text-gray-500 dark:text-gray-400">
							<p className="text-lg md:text-xl leading-relaxed">
								{user?.infos?.aboutMe?.message || (
									<>
										I am a dedicated{" "}
										<span className="text-[#1a1a1a] dark:text-white font-bold">
											Full Stack Developer
										</span>{" "}
										with a deep passion for creating seamless digital experiences.
										My journey began with a curiosity for how things work on the
										web, which quickly evolved into a career building robust
										applications.
									</>
								)}
							</p>
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
						</div>

						<div className="pt-8">
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
