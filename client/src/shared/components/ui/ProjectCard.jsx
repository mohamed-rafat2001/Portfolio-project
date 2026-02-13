import { m as Motion } from "framer-motion";
import { HiArrowUpRight, HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { optimizeCloudinaryUrl } from "../../utils/imageOptimizer";

import { incrementViews } from "../../../features/adminPanel/Projects/services/project";

const ProjectCard = ({ project, index }) => {
	const navigate = useNavigate();
	const navigateUrl = `/projects/${project._id}`;

	const handleCardClick = () => {
        try {
            incrementViews(project._id);
        } catch (error) {
            console.error("Failed to increment views:", error);
        }
		navigate(navigateUrl);
	};

    return (
        <div onClick={handleCardClick} className="block h-full cursor-pointer group/card"> 
            <div className="relative bg-gray-50 dark:bg-[#0b1120] rounded-[2.5rem] border border-gray-100 dark:border-gray-800/40 overflow-hidden flex flex-col h-full hover:border-[#f97316]/20 transition-all duration-700 shadow-2xl">
                {/* Reduced padding image section */}
                <div className="p-2.5 pb-0">
                    <div className="relative aspect-[1.35] w-full overflow-hidden rounded-[2.2rem]">
                        <img
                            src={optimizeCloudinaryUrl(project.mainImg?.secure_url, 400)}
                            alt={project.title}
                            width={400}
                            height={300}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                            crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-900/10 to-gray-900/40"></div>

                        {/* FEATURED badge pill */}
                        <div className="absolute top-4 left-4 z-10">
                            <div className="flex items-center gap-2 px-5 py-2.5 bg-[#f97316] text-white rounded-2xl shadow-xl">
                                <HiArrowLongRight className="text-white text-sm" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    Featured
                                </span>
                            </div>
                        </div>
                        
                        {/* NO badge circle */}
                        <div className="absolute top-4 right-4 z-10 w-11 h-11 flex flex-col items-center justify-center bg-gray-900/60 dark:bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
                            <span className="text-[6px] font-black text-white/40 uppercase tracking-widest leading-none mb-0.5">NO.</span>
                            <span className="text-[12px] font-black text-white leading-none">
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tightened Content Area */}
                <div className="px-6 py-6 md:px-8 md:py-7 flex flex-col grow relative">
                    <h3 className="text-[22px] font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-3 leading-tight group-hover/card:text-[#f97316] transition-colors duration-300">
                        {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-[13px] font-medium leading-[1.6] mb-8 line-clamp-3 opacity-60">
                        {project.description}
                    </p>

                    {/* Footer - No extra padding */}
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800/40 flex items-center justify-between mt-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-8">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-[#f97316] font-black text-[10px] uppercase tracking-[0.2em] hover:text-gray-900 dark:hover:text-white transition-all group/link"
                                >
                                    Live Demo
                                    <HiArrowUpRight className="text-xs transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                </a>
                            )}
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-gray-900 dark:text-white font-black text-[10px] uppercase tracking-[0.2em] hover:text-[#f97316] transition-all group/link"
                                >
                                    Source Code
                                    <HiArrowUpRight className="text-xs transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 opacity-60 group-hover/link:opacity-100" />
                                </a>
                            )}
                        </div>
						{/* Circular Action Button */}
						<button 
                            onClick={handleCardClick}
                            aria-label={`View details for ${project.title}`}
                            className="w-11 h-11 rounded-full bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800/50 flex items-center justify-center text-gray-500 dark:text-gray-500 group-hover/card:bg-[#f97316] group-hover/card:text-white transition-all duration-500 shadow-xl cursor-pointer"
                        >
							<HiArrowUpRight className="text-lg transition-transform" />
						</button>
					</div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
