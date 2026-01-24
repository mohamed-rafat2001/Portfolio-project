import { motion as Motion } from "framer-motion";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

const SkillCard = ({ skill, onEdit, onDelete }) => {
	return (
		<Motion.div
			layout
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			className="group bg-[#0b1120] rounded-[2.5rem] p-10 border border-white/5 transition-all shadow-2xl relative overflow-hidden"
		>
            {/* Header with vertical accent */}
			<div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-orange rounded-full" />
                    <h3 className="font-black text-white uppercase tracking-[0.2em] text-[10px]">
                        {skill.name}
                    </h3>
                </div>
				<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						onClick={() => onEdit(skill)}
						className="p-2 hover:bg-white/5 text-gray-500 hover:text-white rounded-xl transition-all"
					>
						<HiOutlinePencil className="text-sm" />
					</button>
					<button
						onClick={() => onDelete(skill._id)}
						className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-xl transition-all"
					>
						<HiOutlineTrash className="text-sm" />
					</button>
				</div>
			</div>

            {/* Nested Skills Container */}
			<div className="p-8 bg-[#030712] rounded-[2rem] border border-white/5 flex flex-wrap gap-3">
				{skill.skills?.map((s, index) => (
					<span
						key={index}
						className="px-5 py-2.5 bg-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-full border border-white/5 hover:border-orange/30 hover:text-white transition-all cursor-default"
					>
						{s}
					</span>
				))}
			</div>
		</Motion.div>
	);
};

export default SkillCard;
