import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";

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
	const projects = [
		{
			id: "01",
			title: "Smart Farm IoT",
			desc: "An integrated system for monitoring and managing farm conditions using IoT sensors and a real-time web dashboard.",
			tech: ["React", "Node.js", "MQTT", "MongoDB"],
			link: "#",
		},
		{
			id: "02",
			title: "E-Commerce Pro",
			desc: "A full-featured e-commerce platform with secure payments, inventory management, and a seamless user experience.",
			tech: ["Next.js", "Tailwind", "Stripe", "Prisma"],
			link: "#",
		},
		{
			id: "03",
			title: "AI Image Generator",
			desc: "A creative tool that uses generative AI to create unique images from text prompts with social sharing features.",
			tech: ["React", "OpenAI API", "Cloudinary", "Express"],
			link: "#",
		},
	];

	return (
		<Motion.section
			id="projects"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-white dark:bg-gray-950"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-16">
					<h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
						Featured Projects
					</h2>
					<div className="h-px grow bg-gray-200 dark:bg-gray-800"></div>
					<span className="text-orange font-black text-sm uppercase tracking-[0.3em]">
						02
					</span>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, index) => (
						<Motion.div
							key={project.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ y: -10 }}
							className="group relative h-[400px] bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col justify-end p-8 transition-all hover:shadow-2xl hover:shadow-orange/10"
						>
							{/* Large background number */}
							<div className="absolute top-8 right-8 text-gray-200 dark:text-gray-800 font-black text-7xl select-none opacity-40 transition-transform group-hover:scale-110 group-hover:text-orange/20">
								{project.id}
							</div>

							{/* Gradient overlay for text readability */}
							<div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 dark:to-transparent opacity-90"></div>

							<div className="relative z-10 space-y-4">
								<div className="flex flex-wrap gap-2">
									{project.tech.map((tech) => (
										<span
											key={tech}
											className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-orange/10 text-orange rounded-full border border-orange/10"
										>
											{tech}
										</span>
									))}
								</div>
								<h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">
									{project.title}
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed line-clamp-3">
									{project.desc}
								</p>
								<div className="pt-2">
									<Link
										to={project.link}
										className="inline-flex items-center gap-2 text-orange font-black text-[10px] uppercase tracking-widest hover:gap-3 transition-all"
									>
										View Case Study
										<HiArrowUpRight className="text-sm" />
									</Link>
								</div>
							</div>
						</Motion.div>
					))}
				</div>

				<div className="mt-20 text-center">
					<Link
						to="/projects"
						className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[#1a1a1a] dark:text-white font-black uppercase tracking-widest text-xs hover:bg-white dark:hover:bg-gray-800 transition-all shadow-xl shadow-black/5"
					>
						View All Projects
						<HiArrowRight className="text-lg transition-transform group-hover:translate-x-2" />
					</Link>
				</div>
			</div>
		</Motion.section>
	);
};

export default Projects;
