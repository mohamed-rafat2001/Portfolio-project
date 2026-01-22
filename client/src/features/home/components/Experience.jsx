import { motion as Motion } from "framer-motion";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi2";
import useExperiences from "../../adminPanel/Experiences/hooks/useExperiences";
import useEducations from "../../adminPanel/Educations/hooks/useEducations";
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

const Experience = () => {
	const { experiences, isLoading: isExpLoading } = useExperiences();
	const { educations, isLoading: isEduLoading } = useEducations();

	const formatDate = (dateString) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
	};

	if (isExpLoading || isEduLoading) return <LoadingState message="Fetching your journey..." />;

	return (
		<Motion.section
			id="journey"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-12 md:py-16 bg-white dark:bg-gray-900"
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

						<div className="space-y-8 border-l-2 border-gray-100 dark:border-gray-800 ml-5 pl-6 md:pl-8">
							{experiences?.map((exp, index) => (
								<Motion.div
									key={exp._id}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									className="relative"
								>
									{/* Dot */}
									<div className="absolute -left-[33px] md:-left-[41px] top-2 w-4 h-4 rounded-full bg-white dark:bg-gray-950 border-4 border-orange shadow-lg shadow-orange/20"></div>

									<div className="space-y-3">
										<span className="text-[10px] font-black text-orange uppercase tracking-[0.2em] bg-orange/5 px-3 py-1 rounded-full border border-orange/10">
											{exp.duration}
										</span>
										<h4 className="text-xl font-bold text-[#1a1a1a] dark:text-white">
											{exp.role}
										</h4>
										<p className="text-gray-400 font-bold text-sm uppercase tracking-widest">
											{exp.company}
										</p>
										<p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
											{exp.description}
										</p>
									</div>
								</Motion.div>
							))}
						</div>
					</div>

					{/* Education Column */}
					<div className="space-y-12">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl">
								<HiAcademicCap />
							</div>
							<h3 className="text-xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-wider">
								Education
							</h3>
						</div>

						<div className="space-y-8 border-l-2 border-gray-100 dark:border-gray-800 ml-5 pl-8">
							{educations?.map((edu, index) => (
								<Motion.div
									key={edu._id}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									className="relative"
								>
									{/* Dot */}
									<div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full bg-white dark:bg-gray-950 border-4 border-blue-500 shadow-lg shadow-blue-500/20"></div>

									<div className="space-y-3">
										<span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
											{edu.duration}
										</span>
										<h4 className="text-xl font-bold text-[#1a1a1a] dark:text-white">
											{edu.degree}
										</h4>
										<p className="text-gray-400 font-bold text-sm uppercase tracking-widest">
											{edu.institution}
										</p>
										<p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
											{edu.description}
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
