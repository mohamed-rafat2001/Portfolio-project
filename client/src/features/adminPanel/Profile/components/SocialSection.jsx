import { HiOutlineGlobeAlt } from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";

const SocialSection = ({ register, errors }) => {
	return (
		<FormCard
			title="Social Links"
			description="Where people can find you online"
			icon={<HiOutlineGlobeAlt />}
			color="bg-green-500"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<InputField
					label="GitHub"
					placeholder="https://github.com/username"
					error={errors.github?.message}
					{...register("github")}
				/>
				<InputField
					label="LinkedIn"
					placeholder="https://linkedin.com/in/username"
					error={errors.linkedin?.message}
					{...register("linkedin")}
				/>
				<InputField
					label="Twitter"
					placeholder="https://twitter.com/username"
					error={errors.twitter?.message}
					{...register("twitter")}
				/>
				<InputField
					label="Portfolio"
					placeholder="https://yourportfolio.com"
					error={errors.portfolio?.message}
					{...register("portfolio")}
				/>
			</div>
		</FormCard>
	);
};

export default SocialSection;
