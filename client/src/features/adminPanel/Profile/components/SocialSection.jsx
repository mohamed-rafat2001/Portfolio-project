import { HiOutlineLink, HiOutlineUser, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import FormCard from "./FormCard";
import InputField from "./InputField";

const SocialSection = ({ register, errors, isUpdating, isDirty }) => {
	const socialFields = [
		{ id: "linkedin", label: "LinkedIn", placeholder: "https://www.linkedin.com/in/mohamed-rafat-1904" },
		{ id: "github", label: "GitHub", placeholder: "https://github.com/mohamed-rafat2001" },
		{ id: "twitter", label: "Twitter", placeholder: "https://twitter.com/username" },
		{ id: "portfolio", label: "Portfolio", placeholder: "https://yourportfolio.com" },
	];

	return (
		<FormCard
			title="Social Media"
			icon={<HiOutlineLink />}
			isUpdating={isUpdating}
			isDirty={isDirty}
            headerAction={
                <button type="button" className="w-10 h-10 bg-[#030712] border border-white/5 rounded-xl flex items-center justify-center text-white/40 hover:text-orange transition-colors cursor-pointer">
                    <HiPlus className="text-xl" />
                </button>
            }
		>
			<div className="space-y-12">
				{socialFields.map((field) => (
					<div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end group/social">
						<InputField
							label="Platform"
							placeholder={field.label}
							icon={HiOutlineUser}
							readOnly
							className="opacity-60"
						/>
						<div className="relative">
							<InputField
								label="Profile URL"
								placeholder={field.placeholder}
								icon={HiOutlineLink}
								error={errors[field.id]?.message}
								{...register(field.id)}
							/>
							<button 
                                type="button"
                                className="absolute -right-12 top-11 p-2 text-gray-600 hover:text-red-500 transition-colors cursor-pointer opacity-0 group-hover/social:opacity-100"
                            >
								<HiOutlineTrash className="text-xl" />
							</button>
						</div>
					</div>
				))}
			</div>
		</FormCard>
	);
};

export default SocialSection;
