import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { HiOutlineCloudArrowUp, HiOutlineXMark } from "react-icons/hi2";
import Input from "../../../../shared/components/form/Input";
import Textarea from "../../../../shared/components/form/Textarea";

const projectSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	techStack: z.string().transform((val) => val.split(",").map((t) => t.trim()).filter(Boolean)),
	liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
	repoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
	mainImg: z.any().optional(),
});

const ProjectForm = ({ project, onSubmit, isLoading, onCancel }) => {
	const [preview, setPreview] = useState(project?.mainImg?.secure_url || null);
	const [selectedFile, setSelectedFile] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(projectSchema),
		defaultValues: project
			? {
					...project,
					techStack: project.techStack?.map(group => group.techs.join(", ")).join(", ") || "",
			  }
			: {
					title: "",
					description: "",
					techStack: "",
					liveUrl: "",
					repoUrl: "",
			  },
	});

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result);
			reader.readAsDataURL(file);
			setValue("mainImg", file);
		}
	};

	const onFormSubmit = (data) => {
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			if (key === "techStack") {
				// For now, let's send it as a simple array of strings wrapped in the object structure the model expects
				// Or if the model is intended to be simpler, we should adjust it.
				// Given the model: techStack: [{ title, techs: [String] }]
				const formattedTechStack = [{ title: "Technologies", techs: data[key] }];
				formData.append("techStack", JSON.stringify(formattedTechStack));
			} else if (key === "mainImg" && selectedFile) {
				formData.append("mainImg", selectedFile);
			} else if (data[key] !== undefined && data[key] !== null) {
				formData.append(key, data[key]);
			}
		});
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
			{/* Image Upload */}
			<div className="space-y-2">
				<label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">
					Project Cover
				</label>
				<div className="relative group aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-gray-100 dark:border-gray-800 hover:border-orange/50 transition-colors">
					{preview ? (
						<>
							<img src={preview} alt="Preview" className="w-full h-full object-cover" />
							<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								<button
									type="button"
									onClick={() => {
										setPreview(null);
										setSelectedFile(null);
										setValue("mainImg", null);
									}}
									className="p-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors"
								>
									<HiOutlineXMark className="text-xl" />
								</button>
							</div>
						</>
					) : (
						<label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
							<HiOutlineCloudArrowUp className="text-4xl text-gray-300 mb-2" />
							<span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
								Upload Project Image
							</span>
							<input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
						</label>
					)}
				</div>
			</div>

			<Input
				label="Project Title"
				placeholder="e.g. Portfolio Website"
				error={errors.title?.message}
				{...register("title")}
			/>

			<Textarea
				label="Description"
				placeholder="Tell the story of this project..."
				error={errors.description?.message}
				{...register("description")}
				rows={4}
			/>

			<Input
				label="Tech Stack (comma separated)"
				placeholder="React, Tailwind, Node.js"
				error={errors.techStack?.message}
				{...register("techStack")}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Input
					label="Live URL"
					placeholder="https://example.com"
					error={errors.liveUrl?.message}
					{...register("liveUrl")}
				/>
				<Input
					label="Repository URL"
					placeholder="https://github.com/..."
					error={errors.repoUrl?.message}
					{...register("repoUrl")}
				/>
			</div>

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
					{isLoading ? "Saving..." : project ? "Update Project" : "Add Project"}
				</button>
			</div>
		</form>
	);
};

export default ProjectForm;
