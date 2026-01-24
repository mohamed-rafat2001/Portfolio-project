import { HiOutlineBriefcase } from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";

const ProfessionalSection = ({ register, errors }) => {
	return (
		<FormCard
			title="Expertise"
			description="Specific professional details"
			icon={<HiOutlineBriefcase />}
			color="bg-purple-500"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<InputField
					label="Job Title"
					placeholder="e.g. Full Stack Developer"
					error={errors.infos?.job?.title?.message}
					{...register("infos.job.title")}
				/>
				<InputField
					label="Job Note"
					placeholder="e.g. Building modern web applications"
					error={errors.infos?.job?.note?.message}
					{...register("infos.job.note")}
				/>
				<InputField
					label="Location"
					placeholder="e.g. New York, USA"
					error={errors.infos?.location?.message}
					{...register("infos.location")}
				/>
				<div className="flex items-center gap-3 mt-8">
					<input
						type="checkbox"
						id="available"
						className="w-5 h-5 rounded border-gray-300 text-orange focus:ring-orange"
						{...register("infos.available")}
					/>
					<label htmlFor="available" className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Available for work
					</label>
				</div>
			</div>
		</FormCard>
	);
};

export default ProfessionalSection;
