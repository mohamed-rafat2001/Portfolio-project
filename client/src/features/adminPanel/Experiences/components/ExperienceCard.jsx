import { motion as Motion } from "framer-motion";
import { HiOutlineBriefcase, HiOutlinePencil, HiOutlineTrash, HiOutlineCalendar } from "react-icons/hi2";

const ExperienceCard = ({ experience, onEdit, onDelete }) => {
	return (
		<Motion.div
			layout
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="group bg-[#0b1120] rounded-[2rem] p-5 md:p-6 border border-white/5 transition-all shadow-xl relative overflow-hidden"
		>
			<div className="absolute top-0 right-0 w-32 h-32 bg-orange opacity-[0.02] -mr-16 -mt-16 rounded-full group-hover:opacity-[0.05] transition-opacity" />

			<div className="flex items-start justify-between gap-4 relative z-10">
				<div className="flex items-start gap-4">
					<div className="w-12 h-12 rounded-xl bg-[#030712] border border-white/5 flex items-center justify-center text-xl text-orange group-hover:scale-110 transition-transform shrink-0">
						<HiOutlineBriefcase />
					</div>
					<div className="space-y-1">
						<h3 className="text-base font-black text-white uppercase tracking-tight">
							{experience.role}
						</h3>
						<p className="text-orange font-black text-[9px] uppercase tracking-[0.2em] opacity-80">
							{experience.company}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
					<button
						onClick={() => onEdit(experience)}
						className="p-1.5 hover:bg-white/5 text-gray-500 hover:text-white rounded-lg transition-all cursor-pointer"
					>
						<HiOutlinePencil className="text-sm" />
					</button>
					<button
						onClick={() => onDelete(experience._id)}
						className="p-1.5 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-lg transition-all cursor-pointer"
					>
						<HiOutlineTrash className="text-sm" />
					</button>
				</div>
			</div>

			<div className="mt-6 relative z-10">
				<div className="flex items-center gap-3 text-gray-400">
                    <HiOutlineCalendar className="text-base text-orange/60" />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                        {experience.duration}
                    </span>
				</div>
			</div>

			{experience.description && (
				<p className="mt-4 text-[11px] text-gray-500 leading-relaxed font-medium opacity-60 pl-3 border-l-2 border-white/5 whitespace-pre-wrap line-clamp-3">
					{experience.description}
				</p>
			)}
		</Motion.div>
	);
};

export default ExperienceCard;
