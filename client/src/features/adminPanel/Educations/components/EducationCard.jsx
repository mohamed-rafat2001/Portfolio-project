import { motion as Motion } from "framer-motion";
import { HiOutlineAcademicCap, HiOutlinePencil, HiOutlineTrash, HiOutlineCalendar, HiOutlineMapPin } from "react-icons/hi2";

const EducationCard = ({ education, onEdit, onDelete }) => {
	return (
		<Motion.div
			layout
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="space-y-4 group h-full flex flex-col"
		>
            {/* Institution Header */}
			<div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 bg-orange rounded-full shadow-[0_0_10px_rgba(255,165,0,0.3)]" />
                    <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] text-[11px] opacity-70 group-hover:opacity-100 transition-opacity">
                        {education.institution}
                    </h3>
                </div>
				<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
					<button
						onClick={() => onEdit(education)}
						className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all cursor-pointer"
					>
						<HiOutlinePencil className="text-sm" />
					</button>
					<button
						onClick={() => onDelete(education._id)}
						className="p-1.5 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-lg transition-all cursor-pointer"
					>
						<HiOutlineTrash className="text-sm" />
					</button>
				</div>
			</div>

            {/* Content Container */}
			<div className="flex-1 p-6 md:p-8 bg-white dark:bg-[#0b1120] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group/box flex flex-col justify-between min-h-[200px]">
                <div className="absolute inset-0 bg-orange/5 opacity-0 group-hover/box:opacity-100 transition-opacity blur-3xl pointer-events-none"></div>
				
                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-6">
                         <div className="flex items-center gap-4">
                             <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#030712] border border-gray-100 dark:border-white/5 flex items-center justify-center text-orange shadow-inner">
                                <HiOutlineAcademicCap className="text-2xl" />
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">
                                    {education.degree}
                                </h4>
                             </div>
                         </div>
                         <div className="shrink-0 px-4 py-2 bg-gray-50 dark:bg-[#030712] text-[10px] font-black text-orange/80 uppercase tracking-widest rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                            {education.duration}
                        </div>
                    </div>

                    {education.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium italic pl-3 border-l-2 border-gray-100 dark:border-white/10 group-hover/box:text-gray-700 dark:group-hover/box:text-gray-300 transition-colors whitespace-pre-wrap">
                            {education.description}
                        </p>
                    )}
                </div>

                <div className="mt-8 pt-5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between opacity-30 group-hover/box:opacity-100 transition-opacity">
                     <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Academic Sync</span>
                     <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                     </div>
                </div>
			</div>
		</Motion.div>
	);
};

export default EducationCard;
