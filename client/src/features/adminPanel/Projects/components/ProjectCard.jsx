import { m as Motion } from "framer-motion";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineRocketLaunch, HiOutlineEye } from "react-icons/hi2";

const ProjectCard = ({ project, onEdit, onDelete, index }) => {
	const formattedIndex = String(index + 1).padStart(2, '0');

	return (
		<Motion.div
			layout
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="group bg-white dark:bg-[#0b1120] rounded-[2.5rem] shadow-xl hover:shadow-orange/10 dark:hover:shadow-orange/10 transition-all duration-500 overflow-hidden flex flex-col border border-gray-100 dark:border-white/5 min-h-[400px]"
		>
			{/* High-Impact Dominant Image Area (70% of card) */}
			<div className="relative h-[70%] overflow-hidden bg-gray-50 dark:bg-[#030712]">
				<img
					src={project.mainImg?.secure_url}
					alt={project.title}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
				/>
				
				{/* Number Overlay */}
				<div className="absolute top-6 left-6 px-4 py-1.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
					<span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
						MOD {formattedIndex}
					</span>
				</div>

				{/* Featured Badge */}
				{project.isPreferred && (
					<div className="absolute top-6 right-6">
						<div className="bg-orange px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-white/20">
							<HiOutlineRocketLaunch className="text-white text-base" />
							<span className="text-[9px] font-black text-white uppercase tracking-[0.25em]">
								Featured
							</span>
						</div>
					</div>
				)}

				{/* Premium Action Overlay */}
				<div className="absolute inset-0 bg-black/70 dark:bg-[#030712]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
					<button
						onClick={() => onEdit(project)}
						className="w-14 h-14 bg-white dark:bg-white/10 dark:backdrop-blur-md rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all transform hover:scale-110 border dark:border-white/10 shadow-xl"
					>
						<HiOutlinePencil className="text-2xl" />
					</button>
					<button
						onClick={() => onDelete(project._id)}
						className="w-14 h-14 bg-white dark:bg-white/10 dark:backdrop-blur-md rounded-2xl flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-all transform hover:scale-110 border dark:border-white/10 shadow-xl"
					>
						<HiOutlineTrash className="text-2xl" />
					</button>
				</div>
			</div>

			{/* Minimalist Footnote Area */}
			<div className="px-6 py-5 md:px-8 md:py-6 flex-1 flex flex-col justify-center bg-white dark:bg-[#0b1120] relative">
				<div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight group-hover:text-orange transition-colors line-clamp-2">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm shrink-0">
                        <HiOutlineEye className="text-gray-400 dark:text-gray-500 text-sm" />
                        <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{project.views || 0}</span>
                    </div>
                </div>
				
				<p className="text-[13px] text-gray-500 dark:text-gray-400 font-bold leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
					{project.description}
				</p>
			</div>
		</Motion.div>
	);
};

export default ProjectCard;


