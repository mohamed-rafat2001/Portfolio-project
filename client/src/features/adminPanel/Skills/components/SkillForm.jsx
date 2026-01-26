import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../../../../shared/components/form/Input";

const skillSchema = z.object({
	name: z.string().min(2, "Category Name must be at least 2 characters"),
	skills: z.string().transform((val) => val.split(",").map((t) => t.trim()).filter(Boolean)),
});

const SkillForm = ({ skill, onSubmit, isLoading, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(skillSchema),
		defaultValues: skill ? {
			...skill,
			skills: skill.skills?.join(", ") || ""
		} : {
			name: "",
			skills: "",
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Category Name</label>
                <Input
                    placeholder="e.g. Frontend, Backend, Tools"
                    error={errors.name?.message}
                    {...register("name")}
                />
            </div>
			
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Skills</label>
                    <span className="text-[8px] font-black text-orange uppercase tracking-widest">+ Add Skill</span>
                </div>
                <Input
                    placeholder="e.g. React, Vue (comma separated)"
                    error={errors.skills?.message}
                    {...register("skills")}
                />
            </div>

			<div className="flex items-center justify-end gap-6 pt-10">
				<button
					type="button"
					onClick={onCancel}
					className="px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-all cursor-pointer"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isLoading}
					className="px-10 py-5 bg-orange text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-orange/20 shadow-2xl transition-all disabled:opacity-50 min-w-[200px]"
				>
					{isLoading ? "Synchronizing..." : skill ? "Update Category" : "Create Category"}
				</button>
			</div>
		</form>
	);
};

export default SkillForm;
