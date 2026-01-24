import { motion as Motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import useProjects from "../../adminPanel/Projects/hooks/useProjects";
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

const Projects = () => {
	const { projects, isLoading } = useProjects();

	if (isLoading) return <LoadingState message="Loading projects..." />;

	return (
		<Motion.section
			id="projects"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-[#030712] text-white"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-24">
					<h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
						Featured <span className="text-orange">Projects</span>
					</h2>
					<div className="h-px grow bg-gray-800/50"></div>
					<span className="text-orange font-black text-sm uppercase tracking-[0.4em]">
						02
					</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
					{projects?.map((project, index) => (
						<Motion.div
							key={project._id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="group relative bg-[#0a0f1c] rounded-[3rem] border border-gray-800/50 overflow-hidden flex flex-col h-full hover:border-orange/30 transition-all duration-700 hover:shadow-2xl hover:shadow-orange/5"
						>
							{/* Project Image Container */}
							<div className="relative aspect-[16/10] overflow-hidden">
								<img
									src={project.cover?.secure_url}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
								
								{/* Floating Badge */}
								<div className="absolute top-8 left-8">
									<div className="px-5 py-2.5 bg-[#030712]/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">
										<span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange flex items-center gap-2">
											<div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></div>
											Featured Project
										</span>
									</div>
								</div>
							</div>

							{/* Project Info */}
							<div className="p-10 flex flex-col flex-grow relative">
								<div className="mb-6 flex items-start justify-between gap-4">
									<h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-orange transition-colors duration-300">
										{project.title}
									</h3>
									<span className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-2 shrink-0">
										NO. {index + 1 < 10 ? `0${index + 1}` : index + 1}
									</span>
								</div>
								
								<p className="text-gray-400 text-sm font-medium leading-relaxed mb-10 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
									{project.description}
								</p>
								
								{/* Footer */}
								<div className="mt-auto pt-8 border-t border-gray-800/50 flex items-center justify-between">
									<div className="flex items-center gap-8">
										{project.liveLink && (
											<a
												href={project.liveLink}
												target="_blank"
												rel="noreferrer"
												className="group/link text-orange font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2"
											>
												Live Demo 
												<div className="w-8 h-8 rounded-xl bg-orange/5 border border-orange/10 flex items-center justify-center group-hover/link:bg-orange group-hover/link:text-white transition-all duration-300">
													<HiArrowUpRight className="text-sm" />
												</div>
											</a>
										)}
										{project.githubLink && (
											<a
												href={project.githubLink}
												target="_blank"
												rel="noreferrer"
												className="text-gray-500 hover:text-white transition-colors duration-300"
											>
												<span className="text-[10px] font-black uppercase tracking-widest">Code</span>
											</a>
										)}
									</div>
								</div>
							</div>
						</Motion.div>
					))}
				</div>

				<div className="mt-24 text-center">
					<button className="group relative px-12 py-5 bg-white text-gray-950 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-white/5">
						<span className="relative z-10 flex items-center gap-3">
							Explore Full Portfolio <HiArrowUpRight className="text-lg" />
						</span>
						<div className="absolute inset-0 bg-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
					</button>
				</div>
			</div>
		</Motion.section>
	);
};

export default Projects;
