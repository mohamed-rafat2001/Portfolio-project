import { HiOutlineLink, HiOutlineUser, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import { useFieldArray } from "react-hook-form";
import FormCard from "./FormCard";
import InputField from "./InputField";

const SocialSection = ({ register, errors, isUpdating, isDirty, control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialMedia"
    });

	return (
		<FormCard
			title="Social Media Presence"
			icon={<HiOutlineLink />}
			isUpdating={isUpdating}
			isDirty={isDirty}
            headerAction={
                <button 
                    type="button" 
                    onClick={() => append({ name: "", url: "" })}
                    className="flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/20 rounded-xl text-orange hover:bg-orange hover:text-white transition-all cursor-pointer group"
                >
                    <HiPlus className="text-lg group-hover:rotate-90 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Add Platform</span>
                </button>
            }
		>
			<div className="space-y-10">
                {fields.length === 0 && (
                    <div className="py-10 text-center border-2 border-dashed border-gray-100 dark:border-white/5 rounded-4xl">
                        <p className="text-[10px] font-black text-gray-500 dark:text-gray-600 uppercase tracking-widest">No social platforms added yet</p>
                    </div>
                )}

				{fields.map((field, index) => (
					<div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end group/social relative p-8 bg-gray-50 dark:bg-[#030712] border border-gray-100 dark:border-white/5 rounded-4xl hover:border-orange/20 transition-all">
						<InputField
							label={`Platform #${index + 1}`}
							placeholder="e.g. LinkedIn, GitHub"
							icon={HiOutlineUser}
							error={errors.socialMedia?.[index]?.name?.message}
							{...register(`socialMedia.${index}.name`)}
						/>
						<div className="relative">
							<InputField
								label="Profile URL"
								placeholder="https://..."
								icon={HiOutlineLink}
								error={errors.socialMedia?.[index]?.url?.message}
								{...register(`socialMedia.${index}.url`)}
							/>
							<button 
                                type="button"
                                onClick={() => remove(index)}
                                aria-label="Remove platform"
                                className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white shadow-xl opacity-0 group-hover/social:opacity-100 transition-all hover:scale-110 cursor-pointer"
                            >
								<HiOutlineTrash className="text-sm" />
							</button>
						</div>
					</div>
				))}
			</div>
		</FormCard>
	);
};

export default SocialSection;
