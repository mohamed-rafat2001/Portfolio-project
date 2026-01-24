import { motion as Motion } from "framer-motion";
import { HiArrowTopRightOnSquare, HiOutlineCodeBracket, HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi2";

const ProjectCard = ({ project, onEdit, onDelete }) => {
	return (
		<Motion.div
			layout
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="group bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:border-orange/20 transition-all overflow-hidden flex flex-col"
		>
			{/* Image Container */}
			<div className="relative aspect-video overflow-hidden">
				<img
					src={project.mainImg?.secure_url}
					alt={project.title}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
					<div className="flex items-center gap-3">
						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="p-3 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-orange transition-colors"
							>
								<HiArrowTopRightOnSquare className="text-xl" />
							</a>
						)}
						{project.repoUrl && (
							<a
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="p-3 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-orange transition-colors"
							>
								<HiOutlineCodeBracket className="text-xl" />
							</a>
						)}
					</div>
				</div>

				{/* Preferred Badge */}
				{project.isPreferred && (
					<div className="absolute top-4 left-4">
						<span className="px-4 py-1.5 bg-orange text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-sm">
							Featured
						</span>
					</div>
				)}

				{/* Edit/Delete Actions */}
				<div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						onClick={() => onEdit(project)}
						className="p-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm"
					>
						<HiOutlinePencil className="text-lg" />
					</button>
					<button
						onClick={() => onDelete(project._id)}
						className="p-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
					>
						<HiOutlineTrash className="text-lg" />
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="p-8 flex-1 flex flex-col">
				<div className="mb-4">
					<h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight group-hover:text-orange transition-colors">
						{project.title}
					</h3>
				</div>

				<p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 flex-1">
					{project.description}
				</p>

				{/* Tech Stack */}
				<div className="flex flex-wrap gap-2">
					{project.techStack?.map((group) =>
						group.techs.slice(0, 3).map((tech, index) => (
							<span
								key={`${group._id}-${index}`}
								className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-lg"
							>
								{tech}
							</span>
						))
					)}
				</div>
			</div>
		</Motion.div>
	);
};

export default ProjectCard;
