import { motion as Motion } from "framer-motion";
import { HiOutlineBriefcase, HiOutlinePencil, HiOutlineTrash, HiOutlineCalendar } from "react-icons/hi2";

const ExperienceCard = ({ experience, onEdit, onDelete }) => {
	return (
		<Motion.div
			layout
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="group bg-[#0b1120] rounded-[2.5rem] p-10 border border-white/5 transition-all shadow-2xl relative overflow-hidden"
		>
			<div className="absolute top-0 right-0 w-40 h-40 bg-orange/5 -mr-20 -mt-20 rounded-full blur-[60px]" />

			<div className="flex items-start justify-between gap-4 relative z-10">
				<div className="flex items-start gap-8">
					<div className="w-20 h-20 rounded-3xl bg-[#030712] border border-white/5 flex items-center justify-center text-4xl text-orange group-hover:scale-110 transition-transform">
						<HiOutlineBriefcase />
					</div>
					<div className="space-y-2">
						<h3 className="text-2xl font-black text-white uppercase tracking-tight">
							{experience.role}
						</h3>
						<p className="text-orange font-black text-[10px] uppercase tracking-[0.2em]">
							{experience.company}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
					<button
						onClick={() => onEdit(experience)}
						className="p-3 hover:bg-white/5 text-gray-500 hover:text-white rounded-2xl transition-all"
					>
						<HiOutlinePencil className="text-lg" />
					</button>
					<button
						onClick={() => onDelete(experience._id)}
						className="p-3 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-2xl transition-all"
					>
						<HiOutlineTrash className="text-lg" />
					</button>
				</div>
			</div>

			<div className="mt-10 relative z-10">
				<div className="flex items-center gap-4 text-gray-400">
					<div className="px-4 py-2 bg-white/5 rounded-full flex items-center gap-3 border border-white/5">
                        <HiOutlineCalendar className="text-orange" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {experience.duration}
                        </span>
                    </div>
				</div>
			</div>

			{experience.description && (
				<p className="mt-8 text-gray-400 leading-bold font-medium opacity-60 line-clamp-3 pl-4 border-l-2 border-white/5">
					{experience.description}
				</p>
			)}
		</Motion.div>
	);
};

export default ExperienceCard;
