import { HiOutlineIdentification } from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";
import Textarea from "../../../../shared/components/form/Textarea";

const AboutSection = ({ register, errors }) => {
	return (
		<FormCard
			title="Professional Info"
			description="Tell us about yourself and what you do"
			icon={<HiOutlineIdentification />}
			color="bg-blue-500"
		>
			<InputField
				label="About Title"
				placeholder="e.g. About Me"
				error={errors.infos?.aboutMe?.title?.message}
				{...register("infos.aboutMe.title")}
			/>
			<Textarea
				label="About Message"
				placeholder="Write a brief introduction..."
				error={errors.infos?.aboutMe?.message?.message}
				{...register("infos.aboutMe.message")}
				rows={4}
			/>
		</FormCard>
	);
};

export default AboutSection;
