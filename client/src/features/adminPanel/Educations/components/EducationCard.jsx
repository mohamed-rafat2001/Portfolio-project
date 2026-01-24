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
                    <div className="w-1.5 h-4 bg-orange rounded-full shadow-[0_0_10px_rgba(255,165,0,0.3)]" />
                    <h3 className="font-black text-white uppercase tracking-[0.2em] text-[9px] opacity-70 group-hover:opacity-100 transition-opacity">
                        {education.institution}
                    </h3>
                </div>
				<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
					<button
						onClick={() => onEdit(education)}
						className="p-1.5 hover:bg-white/5 text-gray-500 hover:text-white rounded-lg transition-all cursor-pointer"
					>
						<HiOutlinePencil className="text-xs" />
					</button>
					<button
						onClick={() => onDelete(education._id)}
						className="p-1.5 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-lg transition-all cursor-pointer"
					>
						<HiOutlineTrash className="text-xs" />
					</button>
				</div>
			</div>

            {/* Content Container */}
			<div className="flex-1 p-7 bg-[#0b1120] rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group/box flex flex-col justify-between min-h-[170px]">
                <div className="absolute inset-0 bg-orange/5 opacity-0 group-hover/box:opacity-100 transition-opacity blur-3xl pointer-events-none"></div>
				
                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-5">
                         <div className="flex items-center gap-4">
                             <div className="w-11 h-11 rounded-xl bg-[#030712] border border-white/5 flex items-center justify-center text-orange shadow-inner">
                                <HiOutlineAcademicCap className="text-xl" />
                             </div>
                             <div>
                                <h4 className="text-sm font-black text-white uppercase tracking-tight leading-tight line-clamp-2">
                                    {education.degree}
                                </h4>
                             </div>
                         </div>
                         <div className="shrink-0 px-3 py-1.5 bg-[#030712] text-[8px] font-black text-orange/80 uppercase tracking-widest rounded-lg border border-white/5 shadow-sm">
                            {education.duration}
                        </div>
                    </div>

                    {education.description && (
                        <p className="text-[10px] text-gray-400/60 leading-relaxed font-medium italic line-clamp-2 pl-2 border-l border-white/10 group-hover/box:text-gray-300 transition-colors">
                            {education.description}
                        </p>
                    )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between opacity-30 hover:opacity-100 transition-opacity">
                     <span className="text-[7px] font-black uppercase tracking-[0.4em] text-gray-500">Credential Sync</span>
                     <div className="flex gap-1">
                        <div className="w-1 h-1 bg-orange rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                     </div>
                </div>
			</div>
		</Motion.div>
	);
};

export default EducationCard;
