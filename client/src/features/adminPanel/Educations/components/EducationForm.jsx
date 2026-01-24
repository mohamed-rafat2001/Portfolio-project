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
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Input
					label="Degree / Certificate"
					placeholder="e.g. B.S. in Computer Science"
					error={errors.degree?.message}
					{...register("degree")}
				/>
				<Input
					label="Institution"
					placeholder="e.g. University of Technology"
					error={errors.institution?.message}
					{...register("institution")}
				/>
			</div>
			<Input
				label="Duration"
				placeholder="e.g. 2018 - 2022"
				error={errors.duration?.message}
				{...register("duration")}
			/>

			<Textarea
				label="Description"
				placeholder="Briefly describe your studies..."
				error={errors.description?.message}
				{...register("description")}
				rows={4}
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
					{isLoading ? "Saving..." : education ? "Update Education" : "Add Education"}
				</button>
			</div>
		</form>
	);
};

export default EducationForm;
