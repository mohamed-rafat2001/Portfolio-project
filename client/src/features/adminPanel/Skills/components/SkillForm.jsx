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
			<Input
				label="Category Name"
				placeholder="e.g. Frontend"
				error={errors.name?.message}
				{...register("name")}
			/>
			<Input
				label="Skills (comma separated)"
				placeholder="e.g. React, Vue, Angular"
				error={errors.skills?.message}
				{...register("skills")}
			/>

			<div className="flex items-center gap-4 pt-4">
				<button
					type="button"
					onClick={onCancel}
					className="flex-1 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isLoading}
					className="flex-1 px-6 py-3 bg-orange text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 disabled:opacity-50"
				>
					{isLoading ? "Saving..." : skill ? "Update Skill" : "Add Skill"}
				</button>
			</div>
		</form>
	);
};

export default SkillForm;
