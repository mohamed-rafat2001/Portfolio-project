import { HiOutlineUser } from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";

const AccountSection = ({ register, errors }) => {
	return (
		<FormCard
			title="Account Details"
			description="Manage your basic profile information"
			icon={<HiOutlineUser />}
			color="bg-orange"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<InputField
					label="Full Name"
					placeholder="Enter your full name"
					error={errors.name?.message}
					{...register("name")}
				/>
				<InputField
					label="Email Address"
					placeholder="Enter your email"
					error={errors.email?.message}
					{...register("email")}
				/>
				<InputField
					label="Phone Number"
					placeholder="Enter your phone number"
					error={errors.phoneNumber?.message}
					{...register("phoneNumber")}
				/>
			</div>
		</FormCard>
	);
};

export default AccountSection;
