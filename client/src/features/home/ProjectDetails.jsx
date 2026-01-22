import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
	HiArrowLeft, 
	HiArrowUpRight, 
	HiGlobeAlt, 
	HiCodeBracket,
	HiOutlineSquare2Stack,
	HiOutlineCommandLine,
	HiOutlineCpuChip,
	HiOutlineSparkles,
	HiXMark,
	HiChevronLeft,
	HiChevronRight,
	HiOutlineInformationCircle
} from "react-icons/hi2";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProject from "../adminPanel/Projects/hooks/useProject";
import LoadingState from "../../shared/components/ui/LoadingState";

const ProjectDetails = () => {
	const navigate = useNavigate();
	const { project, isLoading, error } = useProject();
	const [selectedImage, setSelectedImage] = useState(null);
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const allImages = project ? [project.mainImg, ...(project.images || [])].filter(Boolean) : [];

	const slideVariants = {
		enter: (direction) => ({
			x: direction > 0 ? 500 : -500,
			opacity: 0,
			scale: 0.95
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			scale: 1
		},
		exit: (direction) => ({
			zIndex: 0,
			x: direction < 0 ? 500 : -500,
			opacity: 0,
			scale: 0.95
		})
	};

	const swipeConfidenceThreshold = 10000;
	const swipePower = (offset, velocity) => {
		return Math.abs(offset) * velocity;
	};

	const paginate = (newDirection) => {
		setDirection(newDirection);
		setActiveImageIndex((prevIndex) => (prevIndex + newDirection + allImages.length) % allImages.length);
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, []);

	useEffect(() => {
		if (isHovered || selectedImage || allImages.length <= 1) return;

		const timer = setInterval(() => {
			paginate(1);
		}, 5000);

		return () => clearInterval(timer);
	}, [isHovered, selectedImage, allImages.length, activeImageIndex]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (selectedImage) {
				if (e.key === "Escape") setSelectedImage(null);
				if (e.key === "ArrowLeft") {
					const newIndex = (activeImageIndex - 1 + allImages.length) % allImages.length;
					setActiveImageIndex(newIndex);
					setSelectedImage(allImages[newIndex].secure_url);
				}
				if (e.key === "ArrowRight") {
					const newIndex = (activeImageIndex + 1) % allImages.length;
					setActiveImageIndex(newIndex);
					setSelectedImage(allImages[newIndex].secure_url);
				}
				return;
			}
			
			if (e.key === "ArrowLeft") paginate(-1);
			if (e.key === "ArrowRight") paginate(1);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedImage, activeImageIndex, allImages.length]);

	const handleNextImage = () => {
		if (selectedImage) {
			const newIndex = (activeImageIndex + 1) % allImages.length;
			setActiveImageIndex(newIndex);
			setSelectedImage(allImages[newIndex].secure_url);
		} else {
			paginate(1);
		}
	};

	const handlePrevImage = () => {
		if (selectedImage) {
			const newIndex = (activeImageIndex - 1 + allImages.length) % allImages.length;
			setActiveImageIndex(newIndex);
			setSelectedImage(allImages[newIndex].secure_url);
		} else {
			paginate(-1);
		}
	};

	if (isLoading) return <LoadingState message="Loading project details..." />;
	if (error || !project) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-white dark:bg-gray-950">
				<div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500">
					<HiOutlineInformationCircle className="text-4xl" />
				</div>
				<h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Project not found</h2>
				<button
					onClick={() => navigate("/projects")}
					className="px-8 py-4 bg-orange text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all shadow-lg shadow-orange/20"
				>
					Back to Projects
				</button>
			</div>
		);
	}

	return (
		<Motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-white dark:bg-gray-950 pb-24"
		>
			{/* Hero Section with Parallax Background */}
			<div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
				<div className="absolute inset-0 bg-gray-900">
					<img
						src={project.mainImg?.secure_url}
						alt={project.title}
						className="w-full h-full object-cover opacity-40 scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent" />
				</div>

				<div className="absolute inset-0 flex items-end">
					<div className="container mx-auto px-4 max-w-7xl pb-16">
						<Motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="space-y-6"
						>
							<button
								onClick={() => navigate(-1)}
								className="group inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all mb-8"
							>
								<HiArrowLeft className="text-xl transition-transform group-hover:-translate-x-1" />
								<span className="font-black uppercase tracking-widest text-[10px]">Back to Projects</span>
							</button>
							
							<div className="space-y-4">
								<h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
									{project.title}
								</h1>
							</div>
						</Motion.div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 max-w-7xl mt-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
					{/* Left Column: Project Content */}
					<div className="lg:col-span-8 space-y-16">
						{/* Overview Section */}
						<section className="space-y-6">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange">
									<HiOutlineInformationCircle className="text-xl" />
								</div>
								<h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Project Overview</h2>
							</div>
							
							<div className="relative group">
								<div className="absolute -inset-4 bg-gradient-to-r from-orange/20 to-transparent rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
								
								<div className="relative p-6 md:p-8 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
									<div className={`prose prose-lg dark:prose-invert max-w-none relative transition-all duration-700 ease-in-out ${!isExpanded ? "max-h-[160px] overflow-hidden" : "max-h-[2000px]"}`}>
										{project.description?.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
											<p 
												key={idx} 
												className={`text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-4 ${
													idx === 0 ? "first-letter:text-4xl first-letter:font-black first-letter:text-orange first-letter:mr-3 first-letter:float-left first-letter:leading-[1]" : ""
												}`}
											>
												{paragraph}
											</p>
										)) || (
											<p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium first-letter:text-4xl first-letter:font-black first-letter:text-orange first-letter:mr-3 first-letter:float-left first-letter:leading-[1]">
												{project.description}
											</p>
										)}

										{!isExpanded && project.description?.length > 200 && (
											<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
										)}
									</div>

									{project.description?.length > 200 && (
										<div className="flex justify-center pt-2">
											<button
												onClick={() => setIsExpanded(!isExpanded)}
												className="group relative px-6 py-2.5 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white rounded-xl font-black uppercase tracking-widest text-[9px] border border-gray-100 dark:border-gray-800 hover:border-orange/30 hover:text-orange transition-all"
											>
												{isExpanded ? "Show Less" : "Read Full Story"}
												<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-orange rounded-full opacity-0 group-hover:opacity-100 transition-all" />
											</button>
										</div>
									)}

									{/* Quick Highlights if available in text (e.g. sentences starting with emoji or keyword) */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
										<div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
											<div className="w-8 h-8 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
												<HiOutlineSparkles className="text-lg" />
											</div>
											<div>
												<h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Status</h4>
												<p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">Completed & Live</p>
											</div>
										</div>
										<div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
											<div className="w-8 h-8 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
												<HiCodeBracket className="text-lg" />
											</div>
											<div>
												<h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Architecture</h4>
												<p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">Full Stack Web App</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* Gallery Slider */}
						<section className="space-y-8">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center text-orange">
										<HiOutlineSquare2Stack className="text-2xl" />
									</div>
									<h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Project Gallery</h2>
								</div>
								<div className="flex items-center gap-4">
									<div className="hidden sm:flex items-center gap-2">
										<button 
											onClick={() => paginate(-1)}
											className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-orange/10 hover:text-orange transition-all"
										>
											<HiChevronLeft className="text-xl" />
										</button>
										<button 
											onClick={() => paginate(1)}
											className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-orange/10 hover:text-orange transition-all"
										>
											<HiChevronRight className="text-xl" />
										</button>
									</div>
									<span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
										{activeImageIndex + 1} / {allImages.length}
									</span>
								</div>
							</div>

							<div className="space-y-6">
								{/* Main Slider View */}
								<div 
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}
									className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl group/slider"
								>
									<AnimatePresence initial={false} custom={direction} mode="popLayout">
										<Motion.div
											key={activeImageIndex}
											custom={direction}
											variants={slideVariants}
											initial="enter"
											animate="center"
											exit="exit"
											transition={{
												x: { type: "spring", stiffness: 400, damping: 40 },
												opacity: { duration: 0.15 },
												scale: { duration: 0.15 }
											}}
											drag="x"
											dragConstraints={{ left: 0, right: 0 }}
											dragElastic={1}
											onDragEnd={(e, { offset, velocity }) => {
												const swipe = swipePower(offset.x, velocity.x);
												if (swipe < -swipeConfidenceThreshold) {
													paginate(1);
												} else if (swipe > swipeConfidenceThreshold) {
													paginate(-1);
												}
											}}
											onClick={() => setSelectedImage(allImages[activeImageIndex].secure_url)}
											className="absolute inset-0 w-full h-full cursor-zoom-in"
										>
											<img
												src={allImages[activeImageIndex].secure_url}
												alt={`Project Gallery ${activeImageIndex}`}
												className="w-full h-full object-cover pointer-events-none"
											/>
											
											{/* Slider Overlay on Hover */}
											<div className="absolute inset-0 bg-black/20 opacity-0 group-hover/slider:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
												<div className="w-16 h-16 rounded-full bg-white text-gray-900 flex items-center justify-center scale-75 group-hover/slider:scale-100 transition-transform shadow-2xl">
													<HiOutlineSparkles className="text-2xl animate-pulse" />
												</div>
											</div>
										</Motion.div>
									</AnimatePresence>

									{/* Mobile Navigation Buttons */}
									<div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none sm:hidden">
										<button 
											onClick={(e) => { e.stopPropagation(); paginate(-1); }}
											className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto"
										>
											<HiChevronLeft className="text-2xl" />
										</button>
										<button 
											onClick={(e) => { e.stopPropagation(); paginate(1); }}
											className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto"
										>
											<HiChevronRight className="text-2xl" />
										</button>
									</div>

									{/* Autoplay Progress Bar */}
									{allImages.length > 1 && !selectedImage && (
										<div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10 backdrop-blur-sm z-20">
											<Motion.div
												key={activeImageIndex}
												initial={{ width: "0%" }}
												animate={{ width: isHovered ? "0%" : "100%" }}
												transition={{ 
													duration: isHovered ? 0 : 5, 
													ease: "linear",
													repeat: isHovered ? Infinity : 0
												}}
												className="h-full bg-orange shadow-[0_0_10px_rgba(255,107,0,0.5)]"
											/>
										</div>
									)}
								</div>

								{/* Thumbnail Navigation */}
								<div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
									{allImages.map((img, index) => (
										<Motion.button
											layout
											key={img.public_id}
											whileHover={{ scale: activeImageIndex === index ? 0.95 : 1.05 }}
											whileTap={{ scale: 0.9 }}
											onClick={() => {
												setDirection(index > activeImageIndex ? 1 : -1);
												setActiveImageIndex(index);
											}}
											className={`relative flex-shrink-0 w-24 sm:w-32 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-start ${
												activeImageIndex === index 
													? "border-orange ring-4 ring-orange/10 scale-95" 
													: "border-transparent opacity-50 hover:opacity-100"
											}`}
										>
											<img
												src={img.secure_url}
												alt={`Thumb ${index}`}
												className="w-full h-full object-cover"
											/>
											{activeImageIndex === index && (
												<Motion.div 
													layoutId="active-thumb"
													className="absolute inset-0 bg-orange/10 flex items-center justify-center"
												>
													<div className="w-2 h-2 rounded-full bg-orange shadow-[0_0_10px_rgba(255,107,0,0.8)]" />
												</Motion.div>
											)}
										</Motion.button>
									))}
								</div>
							</div>
						</section>
					</div>

					{/* Right Column: Sidebar Info */}
					<div className="lg:col-span-4 space-y-8">
						{/* Action Buttons */}
						<div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
							{project.liveUrl && (
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between p-6 bg-orange text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-lg shadow-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
								>
									<span className="flex items-center gap-3">
										<HiGlobeAlt className="text-xl" />
										Live Preview
									</span>
									<HiArrowUpRight className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
								</a>
							)}
							{project.repoUrl && (
								<a
									href={project.repoUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between p-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[2rem] font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all group"
								>
									<span className="flex items-center gap-3">
										<HiCodeBracket className="text-xl" />
										Source Code
									</span>
									<HiArrowUpRight className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
								</a>
							)}
						</div>

						{/* Tech Stack Professional Display */}
						<div className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 space-y-8 shadow-sm">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center text-orange">
									<HiOutlineCpuChip className="text-2xl" />
								</div>
								<h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Technologies</h3>
							</div>

							<div className="space-y-6">
								{project.techStack?.map((stack, idx) => (
									<div key={idx} className="space-y-3">
										<div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">
											<HiOutlineCommandLine className="text-orange" />
											{stack.title}
										</div>
										<div className="flex flex-wrap gap-2">
											{stack.techs?.map((tech) => (
												<span
													key={tech}
													className="px-4 py-2.5 bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 dark:border-gray-800 hover:border-orange/30 hover:text-orange transition-all"
												>
													{tech}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Lightbox Modal */}
			<AnimatePresence>
				{selectedImage && (
					<Motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-950/95 backdrop-blur-xl"
						onClick={() => setSelectedImage(null)}
					>
						<Motion.button
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							className="absolute top-8 right-8 w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all z-10"
							onClick={(e) => {
								e.stopPropagation();
								setSelectedImage(null);
							}}
						>
							<HiXMark className="text-3xl" />
						</Motion.button>

						<div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
							<button 
								onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
								className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
							>
								<HiChevronLeft className="text-3xl" />
							</button>
						</div>

						<div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
							<button 
								onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
								className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
							>
								<HiChevronRight className="text-3xl" />
							</button>
						</div>

						<Motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="relative max-w-7xl max-h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl"
							onClick={(e) => e.stopPropagation()}
						>
							<img
								src={selectedImage}
								alt="Selected Preview"
								className="w-full h-full object-contain"
							/>
							<div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
								Image {activeImageIndex + 1} of {allImages.length}
							</div>
						</Motion.div>
					</Motion.div>
				)}
			</AnimatePresence>
		</Motion.div>
	);
};

export default ProjectDetails;
