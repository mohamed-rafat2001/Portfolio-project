import { HiOutlineLockClosed } from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";

const SecuritySection = ({ register, errors }) => {
	return (
		<FormCard
			title="Security"
			description="Update your password"
			icon={<HiOutlineLockClosed />}
			color="bg-red-500"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<InputField
					label="Current Password"
					type="password"
					placeholder="••••••••"
					error={errors.passwordCurrent?.message}
					{...register("passwordCurrent")}
				/>
				<InputField
					label="New Password"
					type="password"
					placeholder="••••••••"
					error={errors.password?.message}
					{...register("password")}
				/>
				<InputField
					label="Confirm New Password"
					type="password"
					placeholder="••••••••"
					error={errors.passwordConfirm?.message}
					{...register("passwordConfirm")}
				/>
			</div>
		</FormCard>
	);
};

export default SecuritySection;
