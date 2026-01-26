import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../../../../shared/components/form/Input";
import Textarea from "../../../../shared/components/form/Textarea";

const experienceSchema = z.object({
	role: z.string().min(2, "Role is required"),
	company: z.string().min(2, "Company is required"),
	duration: z.string().min(2, "Duration is required"),
	description: z.string().min(3, "Description is required"),
});

const ExperienceForm = ({ experience, onSubmit, isLoading, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(experienceSchema),
		defaultValues: experience || {
			role: "",
			company: "",
			duration: "",
			description: "",
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Company</label>
                    <Input
                        placeholder="Company name"
                        error={errors.company?.message}
                        {...register("company")}
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Role</label>
                    <Input
                        placeholder="Job title"
                        error={errors.role?.message}
                        {...register("role")}
                    />
                </div>
			</div>

            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Duration</label>
                <Input
                    placeholder="e.g. Jan 2022 - Present"
                    error={errors.duration?.message}
                    {...register("duration")}
                />
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Description</label>
                <Textarea
                    placeholder="Key responsibilities and achievements"
                    error={errors.description?.message}
                    {...register("description")}
                    rows={6}
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
					{isLoading ? "Synchronizing..." : experience ? "Update Experience" : "Create Experience"}
				</button>
			</div>
		</form>
	);
};

export default ExperienceForm;
