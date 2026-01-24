import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

const SkillCard = ({ skill, onEdit, onDelete }) => {
    const [showAll, setShowAll] = useState(false);
    const displaySkills = showAll ? skill.skills : skill.skills?.slice(0, 6);
    const hasMore = (skill.skills?.length || 0) > 6;

	return (
		<Motion.div
			layout
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="space-y-6 group flex flex-col h-full"
		>
            {/* Header Area */}
			<div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-4 bg-orange rounded-full" />
                    <h3 className="font-black text-white uppercase tracking-[0.2em] text-[10px]">
                        {skill.name}
                    </h3>
                </div>
				<div className="flex items-center gap-1 opacity-20 group-hover:opacity-100 transition-all">
					<button
						onClick={() => onEdit(skill)}
						className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all cursor-pointer"
					>
						<HiOutlinePencil className="text-sm" />
					</button>
					<button
						onClick={() => onDelete(skill._id)}
						className="p-1.5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-all cursor-pointer"
					>
						<HiOutlineTrash className="text-sm" />
					</button>
				</div>
			</div>

            {/* Tags Container */}
			<div className="flex-1 p-8 bg-[#0b1120] rounded-[2.5rem] border border-white/5 flex flex-col gap-6 shadow-2xl relative overflow-hidden group/box">
                <div className="absolute inset-0 bg-orange/5 opacity-0 group-hover/box:opacity-100 transition-opacity blur-3xl pointer-events-none"></div>
				
                <div className="flex flex-wrap gap-3">
                    {displaySkills?.map((s, index) => (
                        <Motion.span
                            layout
                            key={index}
                            className="px-5 py-2.5 bg-[#030712] text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-[1.2rem] border border-white/5 hover:border-orange/20 hover:text-white transition-all cursor-default shadow-sm"
                        >
                            {s}
                        </Motion.span>
                    ))}
                </div>

                {hasMore && (
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="mt-auto pt-4 text-[9px] font-black text-orange uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 cursor-pointer w-fit"
                    >
                        <div className="w-4 h-[1px] bg-orange/30"></div>
                        {showAll ? "Show Less" : `+ View ${skill.skills.length - 6} More`}
                    </button>
                )}
			</div>
		</Motion.div>
	);
};

export default SkillCard;
