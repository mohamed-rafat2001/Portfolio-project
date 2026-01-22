import { motion as Motion } from "framer-motion";
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

const Skills = () => {
	const { skills, isLoading } = useSkills();

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

	if (isLoading) return <LoadingState />;

	return (
		<Motion.section
			id="skills"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-12 md:py-16 bg-gray-50 dark:bg-gray-950"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-16">
					<h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
						Technical Skills
					</h2>
					<div className="h-px grow bg-gray-200 dark:bg-gray-800"></div>
					<span className="text-orange font-black text-sm uppercase tracking-[0.3em]">
						04
					</span>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{skills?.map((category, catIndex) => (
						<Motion.div
							key={category._id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: catIndex * 0.1 }}
							className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-black/2 border border-gray-100 dark:border-gray-700/50 group hover:border-orange/20 transition-all"
						>
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
							</div>
						</Motion.div>
					))}
				</div>
			</div>
		</Motion.section>
	);
};

export default Skills;
