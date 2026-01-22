import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowUpRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import useProjects from "../../adminPanel/Projects/hooks/useProjects";
import LoadingState from "../../../shared/components/ui/LoadingState";
import { useState, useEffect } from "react";

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

const ProjectCard = ({ project, index }) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/projects/${project._id}`);
	};

	return (
		<Motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			onClick={handleCardClick}
			className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,107,0,0.15)] dark:hover:shadow-[0_20px_50px_rgba(255,107,0,0.05)] hover:-translate-y-2 h-[520px] cursor-pointer"
		>
			{/* Image Section */}
			<div className="relative h-64 overflow-hidden">
				<div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
				{project.mainImg?.secure_url && (
					<img
						src={project.mainImg.secure_url}
						alt={project.title}
						className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
					/>
				)}
				{/* Overlay Gradient */}
				<div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
					<div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
						<span className="px-6 py-3 bg-white text-gray-900 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl">
							View Project
						</span>
					</div>
				</div>
				
				{/* Number Badge */}
				<div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white z-10">
					<span className="text-[10px] font-black opacity-50 leading-none">NO.</span>
					<span className="text-sm font-black leading-none">{String(index + 1).padStart(2, '0')}</span>
				</div>

				{/* Preferred Badge */}
				{project.isPreferred && (
					<div className="absolute top-6 left-6 z-10">
						<div className="px-4 py-2 bg-orange/90 backdrop-blur-md text-white rounded-xl flex items-center gap-2 shadow-xl border border-white/20">
							<HiArrowUpRight className="text-sm rotate-45" />
							<span className="text-[10px] font-black uppercase tracking-[0.2em]">Featured</span>
						</div>
					</div>
				)}
			</div>

			{/* Content Section */}
			<div className="flex-1 p-8 flex flex-col">
				<div className="flex-1 space-y-4">
					<div className="space-y-3">
						<h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight group-hover:text-orange transition-colors">
							{project.title}
						</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed line-clamp-3">
							{project.description}
						</p>
					</div>
				</div>

				{/* Footer Links */}
				<div className="pt-8 mt-auto flex items-center justify-between border-t border-gray-50 dark:border-gray-800">
					<div className="flex gap-6">
						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="flex items-center gap-2 text-orange font-black text-[10px] uppercase tracking-widest group/link"
							>
								<span className="relative">
									Live Demo
									<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange transition-all duration-300 group-hover/link:w-full" />
								</span>
								<HiArrowUpRight className="text-sm transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
							</a>
						)}
						{project.repoUrl && (
							<a
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="flex items-center gap-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-black text-[10px] uppercase tracking-widest transition-colors group/code"
							>
								<span className="relative">
									Source Code
									<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 dark:bg-gray-100 transition-all duration-300 group-hover/code:w-full" />
								</span>
								<HiArrowUpRight className="text-sm" />
							</a>
						)}
					</div>
					
					<div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-orange group-hover:text-white group-hover:rotate-45 transition-all duration-500">
						<HiArrowUpRight className="text-lg" />
					</div>
				</div>
			</div>
		</Motion.div>
	);
};

const Projects = ({ limit, isHomePage = true, projects: externalProjects, isLoading: externalLoading, user }) => {
	const { projects: fetchedProjects, isLoading: fetchedLoading } = useProjects(
		!externalProjects && limit ? { limit } : {},
		{ enabled: !externalProjects }
	);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [itemsPerView, setItemsPerView] = useState(3);

	let projects = externalProjects || fetchedProjects;
	const isLoading = externalLoading || fetchedLoading;

	useEffect(() => {
		const updateItemsPerView = () => {
			if (window.innerWidth >= 1024) setItemsPerView(3);
			else if (window.innerWidth >= 640) setItemsPerView(2);
			else setItemsPerView(1);
		};
		updateItemsPerView();
		window.addEventListener("resize", updateItemsPerView);
		return () => window.removeEventListener("resize", updateItemsPerView);
	}, []);

	const maxIndex = Math.max(0, (projects?.length || 0) - itemsPerView);

	const handleNext = () => {
		setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
	};

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
	};

	useEffect(() => {
		if (!isHomePage || isPaused || projects?.length <= itemsPerView) return;

		const interval = setInterval(() => {
			handleNext();
		}, 4000);

		return () => clearInterval(interval);
	}, [isHomePage, handleNext,isPaused, projects?.length, itemsPerView, maxIndex]);

	useEffect(() => {
		setCurrentIndex((prev) => Math.min(prev, maxIndex));
	}, [maxIndex]);

	if (isLoading) return <LoadingState message="Fetching projects..." />;

	return (
		<Motion.section
			id={isHomePage ? "projects" : undefined}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className={`${isHomePage ? "py-12 md:py-16" : "py-10"} bg-white dark:bg-gray-950 overflow-hidden`}
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between mb-16">
					<div className="flex items-center gap-8 grow">
						<h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
							{isHomePage ? "Featured Projects" : "All Projects"}
						</h2>
						<div className="h-px grow bg-gray-200 dark:bg-gray-800"></div>
						<span className="text-orange font-black text-sm uppercase tracking-[0.3em]">
							{projects?.length || 0}
						</span>
					</div>
				</div>

				{isHomePage ? (
					<div 
						className="relative group/slider"
						onMouseEnter={() => setIsPaused(true)}
						onMouseLeave={() => setIsPaused(false)}
					>
						<div className="overflow-hidden px-4 -mx-4 cursor-grab active:cursor-grabbing">
							<Motion.div 
								drag="x"
								dragConstraints={{ left: 0, right: 0 }}
								onDragEnd={(e, { offset, velocity }) => {
									const swipe = offset.x;
									if (swipe < -50) handleNext();
									else if (swipe > 50) handlePrev();
								}}
								animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
								className="flex gap-8"
							>
								{projects?.map((project, index) => (
									<div key={project._id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] shrink-0">
										<ProjectCard project={project} index={index} />
									</div>
								))}
							</Motion.div>
						</div>

						{/* In-Slider Navigation Buttons */}
						{projects?.length > itemsPerView && (
							<>
								<button
									onClick={handlePrev}
									className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-14 h-14 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-900 dark:text-white shadow-xl opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 transition-all duration-300 z-20 hover:bg-orange hover:text-white hover:border-orange"
									aria-label="Previous Project"
								>
									<HiChevronLeft className="text-2xl" />
								</button>
								<button
									onClick={handleNext}
									className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-14 h-14 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-900 dark:text-white shadow-xl opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 transition-all duration-300 z-20 hover:bg-orange hover:text-white hover:border-orange"
									aria-label="Next Project"
								>
									<HiChevronRight className="text-2xl" />
								</button>
							</>
						)}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects?.map((project, index) => (
							<ProjectCard key={project._id} project={project} index={index} />
						))}
					</div>
				)}

				{isHomePage && (
					<div className="mt-16 flex justify-center">
						<Link
							to="/projects"
							className="group relative px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[2rem] font-black uppercase tracking-widest text-[11px] overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
						>
							<span className="relative z-10 flex items-center gap-3">
								View All Projects
								<HiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</span>
							<div className="absolute inset-0 bg-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
						</Link>
					</div>
				)}
			</div>
		</Motion.section>
	);
};

export default Projects;
