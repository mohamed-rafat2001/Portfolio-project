import { motion as Motion } from "framer-motion";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

const SkillCard = ({ skill, onEdit, onDelete }) => {
	return (
		<Motion.div
			layout
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			className="group bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-orange/20 transition-all"
		>
			<div className="flex items-center justify-between mb-6">
				<h3 className="font-black text-gray-900 dark:text-white uppercase tracking-tight text-lg">
					{skill.name}
				</h3>
				<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						onClick={() => onEdit(skill)}
						className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 rounded-xl transition-colors"
					>
						<HiOutlinePencil className="text-lg" />
					</button>
					<button
						onClick={() => onDelete(skill._id)}
						className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-xl transition-colors"
					>
						<HiOutlineTrash className="text-lg" />
					</button>
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				{skill.skills?.map((s, index) => (
					<span
						key={index}
						className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-lg"
					>
						{s}
					</span>
				))}
			</div>
		</Motion.div>
	);
};

export default SkillCard;
