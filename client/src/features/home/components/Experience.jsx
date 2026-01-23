import { motion as Motion } from "framer-motion";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi2";
import useExperiences from "../../../hooks/useExperiences";
import useEducations from "../../../hooks/useEducations";
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
			className="py-24 md:py-32 bg-[#030712] text-white"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-24">
					<span className="text-orange font-black text-sm uppercase tracking-[0.4em]">
						03
					</span>
					<div className="h-px grow bg-gray-800/50"></div>
					<h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
						My <span className="text-orange">Journey</span>
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
					{/* Experience Column */}
					<div className="space-y-16">
						<div className="flex items-center gap-6">
							<div className="w-16 h-16 rounded-[1.5rem] bg-[#0a0f1c] border border-gray-800 flex items-center justify-center text-orange text-3xl shadow-2xl">
								<HiBriefcase />
							</div>
							<h3 className="text-3xl font-black text-white uppercase tracking-tighter">
								Work <span className="text-orange">History</span>
							</h3>
						</div>

						<div className="space-y-16 border-l border-gray-800/50 ml-8 pl-12">
							{experiences?.map((exp, index) => (
								<Motion.div
									key={exp._id}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									className="relative group"
								>
									{/* Dot */}
									<div className="absolute -left-[57px] top-2 w-5 h-5 rounded-full bg-[#030712] border-4 border-gray-800 group-hover:border-orange transition-colors duration-500 shadow-[0_0_20px_rgba(255,165,0,0)] group-hover:shadow-[0_0_20px_rgba(255,165,0,0.4)]"></div>

									<div className="space-y-6">
										<div className="inline-block px-5 py-2 rounded-xl bg-orange/5 border border-orange/10 group-hover:border-orange/30 transition-colors">
											<span className="text-[11px] font-black text-orange uppercase tracking-[0.2em]">
												{exp.duration}
											</span>
										</div>
										<div>
											<h4 className="text-2xl font-black text-white mb-2 group-hover:text-orange transition-colors uppercase tracking-tight">
												{exp.role}
											</h4>
											<p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em]">
												{exp.company}
											</p>
										</div>
										<p className="text-gray-400 text-base leading-relaxed max-w-xl font-medium">
											{exp.description}
										</p>
									</div>
								</Motion.div>
							))}
						</div>
					</div>

					{/* Education Column */}
					<div className="space-y-16">
						<div className="flex items-center gap-6">
							<div className="w-16 h-16 rounded-[1.5rem] bg-[#0a0f1c] border border-gray-800 flex items-center justify-center text-orange text-3xl shadow-2xl">
								<HiAcademicCap />
							</div>
							<h3 className="text-3xl font-black text-white uppercase tracking-tighter">
								Education <span className="text-orange">Level</span>
							</h3>
						</div>

						<div className="space-y-16 border-l border-gray-800/50 ml-8 pl-12">
							{educations?.map((edu, index) => (
								<Motion.div
									key={edu._id}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									className="relative group"
								>
									{/* Dot */}
									<div className="absolute -left-[57px] top-2 w-5 h-5 rounded-full bg-[#030712] border-4 border-gray-800 group-hover:border-orange transition-colors duration-500 shadow-[0_0_20px_rgba(255,165,0,0)] group-hover:shadow-[0_0_20px_rgba(255,165,0,0.4)]"></div>

									<div className="space-y-6">
										<div className="inline-block px-5 py-2 rounded-xl bg-orange/5 border border-orange/10 group-hover:border-orange/30 transition-colors">
											<span className="text-[11px] font-black text-orange uppercase tracking-[0.2em]">
												{edu.duration}
											</span>
										</div>
										<div>
											<h4 className="text-2xl font-black text-white mb-2 group-hover:text-orange transition-colors uppercase tracking-tight">
												{edu.degree}
											</h4>
											<p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em]">
												{edu.institution}
											</p>
										</div>
										<p className="text-gray-400 text-base leading-relaxed max-w-xl font-medium">
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
