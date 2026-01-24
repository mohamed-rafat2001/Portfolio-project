import { motion as Motion } from "framer-motion";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineRocketLaunch } from "react-icons/hi2";

const ProjectCard = ({ project, onEdit, onDelete, index }) => {
	const formattedIndex = String(index + 1).padStart(2, '0');

	return (
		<Motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="group bg-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100/50"
		>
			{/* Image/Header Area */}
			<div className="relative aspect-[16/10] overflow-hidden m-4 rounded-[2.5rem]">
				<img
					src={project.mainImg?.secure_url}
					alt={project.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
				/>
				
				{/* Number Overlay */}
				<div className="absolute top-6 left-6 px-4 py-1.5 bg-black/20 backdrop-blur-md rounded-full">
					<span className="text-[10px] font-black text-white uppercase tracking-widest">
						#{formattedIndex}
					</span>
				</div>

				{/* Featured Badge */}
				{project.isPreferred && (
					<div className="absolute top-6 right-6">
						<div className="bg-orange px-6 py-2 rounded-2xl shadow-xl flex items-center gap-2">
							<HiOutlineRocketLaunch className="text-white text-sm" />
							<span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
								Featured
							</span>
						</div>
					</div>
				)}

				{/* Action Overlay */}
				<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
					<button
						onClick={() => onEdit(project)}
						className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
					>
						<HiOutlinePencil className="text-xl" />
					</button>
					<button
						onClick={() => onDelete(project._id)}
						className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110"
					>
						<HiOutlineTrash className="text-xl" />
					</button>
				</div>
			</div>

			{/* Content Area */}
			<div className="px-10 pb-10 pt-4 flex-1 flex flex-col">
				<h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-tight group-hover:text-orange transition-colors">
					{project.title}
				</h3>
				
				<p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2">
					{project.description}
				</p>

				{/* Tech Tags */}
				<div className="mt-auto flex flex-wrap gap-2">
					{project.techStack?.[0]?.techs?.slice(0, 3).map((tech, i) => (
						<span 
							key={i}
							className="px-4 py-1.5 bg-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest rounded-lg border border-gray-100"
						>
							{tech}
						</span>
					))}
				</div>
			</div>
		</Motion.div>
	);
};

export default ProjectCard;

