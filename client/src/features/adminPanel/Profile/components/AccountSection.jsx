import { 
    HiOutlineUser, 
    HiOutlineEnvelope, 
    HiOutlineDevicePhoneMobile 
} from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";

const AccountSection = ({ register, errors, isUpdating, isDirty }) => {
	return (
		<FormCard
			title="Account Information"
			icon={<HiOutlineUser />}
            isUpdating={isUpdating}
            isDirty={isDirty}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<InputField
					label="Full Name"
					placeholder="Mohamed Rafat"
                    icon={HiOutlineUser}
					error={errors.name?.message}
					{...register("name")}
				/>
				<InputField
					label="Email Address"
					placeholder="mohamed20rafat@gmail.com"
                    icon={HiOutlineEnvelope}
					error={errors.email?.message}
					{...register("email")}
				/>
				<InputField
					label="Phone Number"
					placeholder="+201050330514"
                    icon={HiOutlineDevicePhoneMobile}
					error={errors.phoneNumber?.message}
					{...register("phoneNumber")}
				/>

                <div className="space-y-2.5">
                    <label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-500 ml-4">
                        Availability Status
                    </label>
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#030712] border-2 border-gray-100 dark:border-white/5 rounded-[1.5rem] px-6 py-4 w-full shadow-inner dark:shadow-none">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                {...register("infos.available")}
                            />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange"></div>
                        </label>
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-2">Available for projects</span>
                    </div>
                </div>
			</div>
		</FormCard>
	);
};

export default AccountSection;
