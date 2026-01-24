import { motion as Motion } from "framer-motion";
import { HiOutlineAcademicCap, HiOutlinePencil, HiOutlineTrash, HiOutlineCalendar, HiOutlineMapPin } from "react-icons/hi2";

const EducationCard = ({ education, onEdit, onDelete }) => {
	return (
		<Motion.div
			layout
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="group bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-orange/20 transition-all relative overflow-hidden"
		>
			<div className="absolute top-0 right-0 w-32 h-32 bg-orange opacity-[0.02] -mr-16 -mt-16 rounded-full group-hover:opacity-[0.05] transition-opacity" />

			<div className="flex items-start justify-between gap-4 relative">
				<div className="flex items-start gap-6">
					<div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center text-3xl text-orange group-hover:scale-110 transition-transform">
						<HiOutlineAcademicCap />
					</div>
					<div className="space-y-1">
						<h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
							{education.degree}
						</h3>
						<p className="text-orange font-bold text-sm">
							{education.institution}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						onClick={() => onEdit(education)}
						className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 rounded-xl transition-colors"
					>
						<HiOutlinePencil className="text-lg" />
					</button>
					<button
						onClick={() => onDelete(education._id)}
						className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-xl transition-colors"
					>
						<HiOutlineTrash className="text-lg" />
					</button>
				</div>
			</div>

			<div className="mt-8">
				<div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
					<HiOutlineCalendar className="text-lg text-orange" />
					<span className="text-xs font-bold uppercase tracking-widest">
						{education.duration}
					</span>
				</div>
			</div>

			{education.description && (
				<p className="mt-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
					{education.description}
				</p>
			)}
		</Motion.div>
	);
};

export default EducationCard;
