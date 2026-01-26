import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../../../../shared/components/form/Input";
import Textarea from "../../../../shared/components/form/Textarea";

const educationSchema = z.object({
	degree: z.string().min(2, "Degree is required"),
	institution: z.string().min(2, "Institution is required"),
	duration: z.string().min(2, "Duration is required"),
	description: z.string().min(3, "Description is required"),
});

const EducationForm = ({ education, onSubmit, isLoading, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(educationSchema),
		defaultValues: education || {
			degree: "",
			institution: "",
			duration: "",
			description: "",
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Institution</label>
                    <Input
                        placeholder="University/School name"
                        error={errors.institution?.message}
                        {...register("institution")}
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Degree</label>
                    <Input
                        placeholder="Field of study"
                        error={errors.degree?.message}
                        {...register("degree")}
                    />
                </div>
			</div>

            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Duration</label>
                <div className="relative">
                    <Input
                        placeholder="e.g. 2018 - 2022"
                        error={errors.duration?.message}
                        {...register("duration")}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Description (Optional)</label>
                <Textarea
                    placeholder="Honors, GPA, or relevant courses"
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
					{isLoading ? "Synchronizing..." : education ? "Update Education" : "Create Education"}
				</button>
			</div>
		</form>
	);
};

export default EducationForm;
