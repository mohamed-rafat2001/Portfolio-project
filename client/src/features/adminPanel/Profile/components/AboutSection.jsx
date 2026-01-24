import { HiOutlineUser, HiOutlineInformationCircle } from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";

const AboutSection = ({ register, errors, isUpdating, isDirty }) => {
	return (
		<FormCard
			title="About Me"
			icon={<HiOutlineInformationCircle />}
            isUpdating={isUpdating}
            isDirty={isDirty}
		>
			<div className="space-y-10">
				<InputField
					label="Section Title"
					placeholder="Hello, I'm Mohamed Rafat."
                    icon={HiOutlineInformationCircle}
					error={errors.infos?.aboutMe?.title?.message}
					{...register("infos.aboutMe.title")}
				/>
				<InputField
					label="Short Biography"
					placeholder="I am a dedicated Full Stack Developer..."
                    icon={HiOutlineUser}
					error={errors.infos?.aboutMe?.message?.message}
                    className="min-h-[150px]"
					{...register("infos.aboutMe.message")}
				/>
			</div>
		</FormCard>
	);
};

export default AboutSection;
