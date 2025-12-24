import { motion as Motion } from "framer-motion";
import {
	HiCommandLine,
	HiCircleStack,
	HiWrenchScrewdriver,
	HiArrowsRightLeft,
	HiCodeBracket,
	HiUserGroup,
} from "react-icons/hi2";

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
	const skillCategories = [
		{
			name: "Frontend & UI",
			icon: <HiCommandLine />,
			color: "blue",
			skills: [
				"OutSystems",
				"React.js / Vite",
				"JavaScript (ES6+)",
				"TypeScript",
				"Next.js",
				"HTML5 & CSS3",
				"Tailwind CSS",
				"Bootstrap",
			],
		},
		{
			name: "State & APIs",
			icon: <HiArrowsRightLeft />,
			color: "green",
			skills: [
				"Context API",
				"Redux / Toolkit",
				"React Query",
				"RESTful APIs",
				"Axios",
			],
		},
		{
			name: "Backend & DB",
			icon: <HiCircleStack />,
			color: "purple",
			skills: ["OutSystems", "Node.js", "Express.js", "MongoDB", "SQL"],
		},
		{
			name: "Tools & Platforms",
			icon: <HiWrenchScrewdriver />,
			color: "orange",
			skills: ["Git & GitHub", "Firebase", "Netlify", "Vercel"],
		},
		{
			name: "Fundamentals",
			icon: <HiCodeBracket />,
			color: "blue",
			skills: ["Data Structures", "Algorithms", "OOP", "Python"],
		},
		{
			name: "Soft Skills",
			icon: <HiUserGroup />,
			color: "green",
			skills: [
				"Teamwork",
				"Leadership",
				"Time Management",
				"Problem-Solving",
				"Communication",
			],
		},
	];

	return (
		<Motion.section
			id="skills"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-gray-50 dark:bg-gray-950"
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
					{skillCategories.map((category, catIndex) => (
						<Motion.div
							key={category.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: catIndex * 0.1 }}
							className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-black/2 border border-gray-100 dark:border-gray-700/50 group hover:border-orange/20 transition-all"
						>
							<div
								className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all group-hover:scale-110
								${
									category.color === "blue"
										? "bg-blue-50 text-blue-500 dark:bg-blue-900/20"
										: ""
								}
								${
									category.color === "green"
										? "bg-green-50 text-green-500 dark:bg-green-900/20"
										: ""
								}
								${
									category.color === "purple"
										? "bg-purple-50 text-purple-500 dark:bg-purple-900/20"
										: ""
								}
								${
									category.color === "orange"
										? "bg-orange-50 text-orange-500 dark:bg-orange-900/20"
										: ""
								}
							`}
							>
								{category.icon}
							</div>

							<h3 className="text-lg font-black text-[#1a1a1a] dark:text-white mb-6 uppercase tracking-wider">
								{category.name}
							</h3>

							<ul className="space-y-4">
								{category.skills.map((skill) => (
									<li
										key={skill}
										className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-medium text-sm"
									>
										<div className="w-1.5 h-1.5 rounded-full bg-orange/40"></div>
										{skill}
									</li>
								))}
							</ul>
						</Motion.div>
					))}
				</div>
			</div>
		</Motion.section>
	);
};

export default Skills;
