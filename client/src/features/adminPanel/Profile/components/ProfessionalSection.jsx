import { HiOutlineUser, HiOutlineMapPin, HiOutlineInformationCircle } from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";

const ProfessionalSection = ({ register, errors, isUpdating, isDirty }) => {
	return (
		<FormCard
			title="Professional Details"
			icon={<HiOutlineInformationCircle />}
            isUpdating={isUpdating}
            isDirty={isDirty}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<InputField
					label="Job Title"
					placeholder="Full Stack Dev"
                    icon={HiOutlineUser}
					error={errors.infos?.job?.title?.message}
					{...register("infos.job.title")}
				/>
				<InputField
					label="Location"
					placeholder="Egypt"
                    icon={HiOutlineMapPin}
					error={errors.location?.message}
					{...register("location")}
				/>
                <div className="md:col-span-2">
                    <InputField
                        label="Job Note"
                        placeholder="Building robust, scalable applications..."
                        icon={HiOutlineInformationCircle}
                        error={errors.infos?.job?.note?.message}
                        {...register("infos.job.note")}
                    />
                </div>
			</div>
		</FormCard>
	);
};

export default ProfessionalSection;
