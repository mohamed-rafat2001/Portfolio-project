import { motion as Motion } from "framer-motion";
import {
	HiCommandLine,
	HiCircleStack,
	HiWrenchScrewdriver,
	HiArrowsRightLeft,
	HiCodeBracket,
	HiUserGroup,
} from "react-icons/hi2";
<<<<<<< HEAD
import useSkills from "../../../hooks/useSkills";
=======
import useSkills from "../../adminPanel/Skills/hooks/useSkills";
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
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

const Skills = () => {
	const { skills, isLoading } = useSkills();

<<<<<<< HEAD
=======
	const getIcon = (index) => {
		const icons = [
			<HiCommandLine />,
			<HiArrowsRightLeft />,
			<HiCircleStack />,
			<HiWrenchScrewdriver />,
			<HiCodeBracket />,
			<HiUserGroup />,
		];
		return icons[index % icons.length];
	};

	const getColor = (index) => {
		const colors = ["blue", "green", "purple", "orange"];
		return colors[index % colors.length];
	};

>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
	if (isLoading) return <LoadingState />;

	return (
		<Motion.section
			id="skills"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
<<<<<<< HEAD
			className="py-24 md:py-32 bg-[#030712]"
=======
			className="py-12 md:py-16 bg-gray-50 dark:bg-gray-950"
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-20">
					<div className="flex flex-col">
						<span className="text-orange font-black text-[10px] uppercase tracking-[0.4em] mb-2">
							Abilities
						</span>
						<h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
							Technical <span className="text-orange">Skills</span>
						</h2>
					</div>
					<div className="h-px grow bg-gray-800/50"></div>
					<span className="text-gray-800 font-black text-6xl md:text-8xl select-none">
						04
					</span>
				</div>

<<<<<<< HEAD
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{skills?.map((skill, catIndex) => (
						<Motion.div
							key={skill._id}
=======
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{skills?.map((category, catIndex) => (
						<Motion.div
							key={category._id}
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: catIndex * 0.1 }}
							className="space-y-6 group"
						>
<<<<<<< HEAD
							<div className="flex items-center gap-3 px-2">
								<div className="w-1.5 h-6 bg-orange rounded-full" />
								<h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">
									{skill.name}
								</h3>
							</div>

							<div className="p-10 bg-[#0a0f1c] rounded-[3rem] border border-gray-800/50 shadow-2xl group-hover:border-orange/30 transition-all duration-500 min-h-[200px]">
								<div className="flex flex-wrap gap-4">
									{skill.skills?.map((s, sIndex) => (
										<Motion.span
											key={sIndex}
											whileHover={{ scale: 1.05, y: -2 }}
											className="px-6 py-3 bg-[#030712] text-gray-300 text-[12px] font-bold rounded-2xl border border-gray-800/50 hover:border-orange/40 hover:text-orange hover:bg-orange/5 transition-all cursor-default shadow-sm"
										>
											{s}
										</Motion.span>
									))}
								</div>
=======
							<div
								className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all group-hover:scale-110 shrink-0
								${
									getColor(catIndex) === "blue"
										? "bg-blue-50 text-blue-500 dark:bg-blue-900/20"
										: ""
								}
								${
									getColor(catIndex) === "green"
										? "bg-green-50 text-green-500 dark:bg-green-900/20"
										: ""
								}
								${
									getColor(catIndex) === "purple"
										? "bg-purple-50 text-purple-500 dark:bg-purple-900/20"
										: ""
								}
								${
									getColor(catIndex) === "orange"
										? "bg-orange-50 text-orange-500 dark:bg-orange-900/20"
										: ""
								}
							`}
								aria-hidden="true"
							>
								{getIcon(catIndex)}
							</div>

							<h3 className="text-lg font-black text-[#1a1a1a] dark:text-white mb-6 uppercase tracking-wider">
								{category.name}
							</h3>

							<div className="flex flex-wrap gap-2">
								{category.skills.map((s, sIndex) => (
									<span key={sIndex} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl border border-gray-100 dark:border-gray-700">
										{s}
									</span>
								))}
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
							</div>
						</Motion.div>
					))}
				</div>
			</div>
		</Motion.section>
	);
};

export default Skills;
