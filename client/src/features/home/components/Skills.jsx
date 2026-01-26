import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
	HiCommandLine,
	HiCircleStack,
	HiWrenchScrewdriver,
	HiArrowsRightLeft,
	HiCodeBracket,
	HiUserGroup,
} from "react-icons/hi2";
import useSkills from "../../adminPanel/Skills/hooks/useSkills";
import LoadingState from "../../../shared/components/ui/LoadingState";

const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
		},
	},
};

const SkillCategoryCard = ({ skill, catIndex }) => {
	const [showAll, setShowAll] = useState(false);
	const displaySkills = showAll ? skill.skills : skill.skills?.slice(0, 8);
	const hasMore = (skill.skills?.length || 0) > 8;

	return (
		<Motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: catIndex * 0.1 }}
			className="space-y-6 group"
		>
			<div className="flex items-center gap-3 px-2">
				<div className="w-1.5 h-6 bg-orange rounded-full" />
				<h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">
					{skill.name}
				</h3>
			</div>

			<div className={`p-6 md:p-10 bg-gray-50 dark:bg-[#0a0f1c] rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl group-hover:border-orange/30 transition-all duration-500 flex flex-col ${showAll ? 'min-h-[300px]' : 'h-[250px]'}`}>
				<div className={`flex flex-wrap gap-4 ${!showAll ? 'overflow-hidden' : ''}`}>
					<AnimatePresence>
						{displaySkills?.map((s, sIndex) => (
							<Motion.span
								key={sIndex}
								layout
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								whileHover={{ scale: 1.05, y: -2 }}
								className="px-6 py-3 bg-white dark:bg-[#030712] text-gray-500 dark:text-gray-300 text-[12px] font-bold rounded-2xl border border-gray-100 dark:border-white/5 hover:border-orange/40 hover:text-orange hover:bg-orange/5 transition-all cursor-default shadow-sm"
							>
								{s}
							</Motion.span>
						))}
					</AnimatePresence>
				</div>

				{hasMore && (
					<button 
						onClick={() => setShowAll(!showAll)}
						className="mt-auto pt-6 text-[10px] font-black text-orange uppercase tracking-[0.3em] hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 cursor-pointer w-fit"
					>
						<div className="w-6 h-[1px] bg-orange/30"></div>
						{showAll ? "Show Less" : `+ View ${skill.skills.length - 8} More`}
					</button>
				)}
			</div>
		</Motion.div>
	);
};

const Skills = () => {
	const { skills, isLoading } = useSkills();

	if (isLoading) return <LoadingState />;

	const priorityOrder = [
		"frontend", 
		"backend", 
		"state & api", 
		"state & apis",
		"fundamental",
		"fundamentals"
	];

	const sortedSkills = [...(skills || [])].sort((a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();
		
		const indexA = priorityOrder.findIndex(p => nameA.includes(p));
		const indexB = priorityOrder.findIndex(p => nameB.includes(p));
		
		if (indexA !== -1 && indexB !== -1) return indexA - indexB;
		if (indexA !== -1) return -1;
		if (indexB !== -1) return 1;
		return 0;
	});

	return (
		<Motion.section
			id="skills"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-white dark:bg-[#030712] transition-colors duration-500"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-20">
					<div className="flex flex-col">
						<span className="text-orange font-black text-[10px] uppercase tracking-[0.4em] mb-2">
							Abilities
						</span>
						<h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
							Technical <span className="text-orange">Skills</span>
						</h2>
					</div>
					<div className="h-px grow bg-gray-200 dark:bg-gray-800/50"></div>
					<span className="text-gray-100 dark:text-gray-800 font-black text-6xl md:text-8xl select-none">
						04
					</span>
				</div>
 
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{sortedSkills.map((skill, catIndex) => (
						<SkillCategoryCard key={skill._id} skill={skill} catIndex={catIndex} />
					))}
				</div>
			</div>
		</Motion.section>
	);
};

export default Skills;
