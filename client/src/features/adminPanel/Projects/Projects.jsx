import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineGlobeAlt, HiOutlineCodeBracket } from "react-icons/hi2";
import useProjects from "../../../hooks/useProjects";
import useCreateProj from "./hooks/useCreateProj";
import useUpdateProj from "./hooks/useUpdateProj";
import useDeleteProj from "./hooks/useDeleteProj";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Projects = () => {
	const { projects, isLoading } = useProjects();
	const { createProj, isLoading: isCreating } = useCreateProj();
	const { updateProj, isLoading: isUpdating } = useUpdateProj();
	const { deleteProj, isLoading: isDeleting } = useDeleteProj();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState(null);

	const { register, handleSubmit, reset, setValue } = useForm();

	const onSubmit = (data) => {
		if (editingProject) {
			updateProj({ id: editingProject._id, data });
		} else {
			createProj(data);
		}
		closeModal();
	};

	const openModal = (project = null) => {
		if (project) {
			setEditingProject(project);
			setValue("title", project.title);
			setValue("description", project.description);
			setValue("techStack", project.techStack.join(", "));
			setValue("githubUrl", project.githubUrl);
			setValue("liveUrl", project.liveUrl);
			setValue("image", project.image);
		} else {
			setEditingProject(null);
			reset();
		}
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingProject(null);
		reset();
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this project?")) {
			deleteProj(id);
		}
	};

	if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin"></div></div>;

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Projects</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-2">Manage your portfolio projects and case studies.</p>
				</div>
				<button
					onClick={() => openModal()}
					className="flex items-center justify-center gap-2 bg-orange text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange/20 hover:scale-105 transition-all"
				>
					<HiOutlinePlus className="text-lg" />
					Add Project
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{projects?.map((project) => (
					<Motion.div
						layout
						key={project._id}
						className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden group"
					>
						<div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
							<img
								src={project.image}
								alt={project.title}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
								<button
									onClick={() => openModal(project)}
									className="p-3 bg-white text-gray-900 rounded-xl hover:scale-110 transition-transform"
								>
									<HiOutlinePencil />
								</button>
								<button
									onClick={() => handleDelete(project._id)}
									className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform"
								>
									<HiOutlineTrash />
								</button>
							</div>
						</div>
						<div className="p-6">
							<h3 className="font-black text-lg text-gray-900 dark:text-white uppercase truncate">{project.title}</h3>
							<p className="text-gray-500 text-sm mt-2 line-clamp-2 h-10">{project.description}</p>
							<div className="flex flex-wrap gap-2 mt-4">
								{project.techStack.map((tech) => (
									<span key={tech} className="px-3 py-1 bg-gray-50 dark:bg-gray-950 text-gray-400 dark:text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
										{tech}
									</span>
								))}
							</div>
						</div>
					</Motion.div>
				))}
			</div>

			{/* Modal */}
			<AnimatePresence>
				{isModalOpen && (
					<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
						<Motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={closeModal}
							className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
						/>
						<Motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-4xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
						>
							<div className="p-8">
								<h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white mb-6">
									{editingProject ? "Edit Project" : "Add New Project"}
								</h2>
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Title</label>
											<input
												{...register("title", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
												placeholder="Project title"
											/>
										</div>
										<div className="space-y-2">
											<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Image URL</label>
											<input
												{...register("image", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
												placeholder="https://..."
											/>
										</div>
									</div>

									<div className="space-y-2">
										<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Description</label>
										<textarea
											{...register("description", { required: true })}
											rows={3}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm resize-none"
											placeholder="Brief project description"
										/>
									</div>

									<div className="space-y-2">
										<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Tech Stack (comma separated)</label>
										<input
											{...register("techStack", { required: true })}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
											placeholder="React, Tailwind, Node.js"
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">GitHub URL</label>
											<div className="relative">
												<HiOutlineCodeBracket className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
												<input
													{...register("githubUrl")}
													className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
													placeholder="GitHub link"
												/>
											</div>
										</div>
										<div className="space-y-2">
											<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Live URL</label>
											<div className="relative">
												<HiOutlineGlobeAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
												<input
													{...register("liveUrl")}
													className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
													placeholder="Live demo link"
												/>
											</div>
										</div>
									</div>

									<div className="flex justify-end gap-4 mt-8">
										<button
											type="button"
											onClick={closeModal}
											className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
										>
											Cancel
										</button>
										<button
											disabled={isCreating || isUpdating}
											className="bg-orange text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange/20 hover:scale-105 transition-all disabled:opacity-50"
										>
											{editingProject ? "Save Changes" : "Create Project"}
										</button>
									</div>
								</form>
							</div>
						</Motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Projects;
