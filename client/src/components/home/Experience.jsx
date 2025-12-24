import { motion as Motion } from "framer-motion";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi2";

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

const Experience = () => {
	const experiences = [
		{
			company: "Freelance",
			role: "Full-Stack Developer",
			period: "2023 - Present",
			desc: "Developing custom web solutions for diverse clients, focusing on modern stacks like MERN and Next.js to deliver scalable and performant applications.",
		},
		{
			company: "Self-Employed",
			role: "Web Developer & UI Designer",
			period: "2021 - 2023",
			desc: "Focused on building responsive, user-centric websites with a strong emphasis on clean code and intuitive design principles.",
		},
	];

	const education = [
		{
			degree: "Bachelor of Electrical and Computer Engineering",
			school: "Higher Institute of Engineering and Technology in New Minya",
			period: "2020 - 2025",
			desc: "Graduation Project: Smart Farm IoT Management System (Grade: Excellent). Focus on hardware-software integration and real-time monitoring.",
		},
		{
			degree: "Web Development & Design Internships",
			school: "National Telecommunication Institute (NTI)",
			period: "2022",
			desc: "Hands-on experience in full-stack development using MERN stack and responsive UI design with modern web technologies.",
		},
	];

	return (
		<Motion.section
			id="journey"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-white dark:bg-gray-900"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-16">
					<span className="text-orange font-black text-sm uppercase tracking-[0.3em]">
						03
					</span>
					<div className="h-px grow bg-gray-200 dark:bg-gray-800"></div>
					<h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
						My Journey
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
					{/* Experience Column */}
					<div className="space-y-12">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange text-xl">
								<HiBriefcase />
							</div>
							<h3 className="text-xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-wider">
								Work History
							</h3>
						</div>

						<div className="space-y-8 border-l-2 border-gray-100 dark:border-gray-800 ml-5 pl-8">
							{experiences.map((exp, index) => (
								<Motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									className="relative"
								>
									{/* Dot */}
									<div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full bg-white dark:bg-gray-950 border-4 border-orange shadow-lg shadow-orange/20"></div>

									<div className="space-y-3">
										<span className="text-[10px] font-black text-orange uppercase tracking-[0.2em] bg-orange/5 px-3 py-1 rounded-full border border-orange/10">
											{exp.period}
										</span>
										<h4 className="text-xl font-bold text-[#1a1a1a] dark:text-white">
											{exp.role}
										</h4>
										<p className="text-gray-400 font-bold text-sm uppercase tracking-widest">
											{exp.company}
										</p>
										<p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
											{exp.desc}
										</p>
									</div>
								</Motion.div>
							))}
						</div>
					</div>

					{/* Education Column */}
					<div className="space-y-12">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange text-xl">
								<HiAcademicCap />
							</div>
							<h3 className="text-xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-wider">
								Education
							</h3>
						</div>

						<div className="space-y-8 border-l-2 border-gray-100 dark:border-gray-800 ml-5 pl-8">
							{education.map((edu, index) => (
								<Motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									className="relative"
								>
									{/* Dot */}
									<div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full bg-white dark:bg-gray-950 border-4 border-orange shadow-lg shadow-orange/20"></div>

									<div className="space-y-3">
										<span className="text-[10px] font-black text-orange uppercase tracking-[0.2em] bg-orange/5 px-3 py-1 rounded-full border border-orange/10">
											{edu.period}
										</span>
										<h4 className="text-xl font-bold text-[#1a1a1a] dark:text-white">
											{edu.degree}
										</h4>
										<p className="text-gray-400 font-bold text-sm uppercase tracking-widest">
											{edu.school}
										</p>
										<p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
											{edu.desc}
										</p>
									</div>
								</Motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Motion.section>
	);
};

export default Experience;
