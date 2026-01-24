import { HiOutlineLockClosed, HiOutlineKey, HiOutlineShieldCheck } from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";

const SecuritySection = ({ register, errors, isUpdating, isDirty }) => {
	return (
		<FormCard
			title="Security Settings"
			icon={<HiOutlineLockClosed />}
            isUpdating={isUpdating}
            isDirty={isDirty}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<InputField
					label="Current Password"
					type="password"
					placeholder="••••••••"
                    icon={HiOutlineKey}
					error={errors.passwordCurrent?.message}
					{...register("passwordCurrent")}
				/>
				<InputField
					label="New Password"
					type="password"
					placeholder="••••••••"
                    icon={HiOutlineLockClosed}
					error={errors.password?.message}
					{...register("password")}
				/>
				<InputField
					label="Confirm New Password"
					type="password"
					placeholder="••••••••"
                    icon={HiOutlineShieldCheck}
					error={errors.confirmPassword?.message}
					{...register("confirmPassword")}
				/>
			</div>
		</FormCard>
	);
};

export default SecuritySection;
