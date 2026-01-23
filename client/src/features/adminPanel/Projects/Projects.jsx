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
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("githubLink", data.githubLink);
		formData.append("liveLink", data.liveLink);
		
		// Handle techs as JSON string for server
		const techsArray = data.techs.split(",").map(t => t.trim()).filter(t => t !== "");
		formData.append("techs", JSON.stringify(techsArray));

		if (data.cover && data.cover[0]) {
			formData.append("cover", data.cover[0]);
		}

		if (editingProject) {
			updateProj({ id: editingProject._id, data: formData });
		} else {
			createProj(formData);
		}
		closeModal();
	};

	const openModal = (project = null) => {
		if (project) {
			setEditingProject(project);
			setValue("title", project.title);
			setValue("description", project.description);
			setValue("techs", project.techs.join(", "));
			setValue("githubLink", project.githubLink);
			setValue("liveLink", project.liveLink);
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
					ADD PROJECT
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
				{projects?.map((project) => (
					<Motion.div
						layout
						key={project._id}
						className="bg-white dark:bg-[#0a0f1c] rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50 overflow-hidden group shadow-sm hover:shadow-2xl hover:shadow-orange/5 transition-all duration-500"
					>
						<div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-900">
							<img
								src={project.cover?.secure_url}
								alt={project.title}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-[#030712]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex items-center justify-center gap-4">
								<button
									onClick={() => openModal(project)}
									className="p-4 bg-white text-gray-900 rounded-2xl hover:scale-110 transition-transform shadow-xl"
									title="Edit Project"
								>
									<HiOutlinePencil className="text-xl" />
								</button>
								<button
									onClick={() => handleDelete(project._id)}
									className="p-4 bg-red-500 text-white rounded-2xl hover:scale-110 transition-transform shadow-xl shadow-red-500/20"
									title="Delete Project"
								>
									<HiOutlineTrash className="text-xl" />
								</button>
							</div>
						</div>
						<div className="p-8">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tight truncate">{project.title}</h3>
								<div className="flex gap-2">
									{project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange transition-colors"><HiOutlineCodeBracket className="text-xl" /></a>}
									{project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange transition-colors"><HiOutlineGlobeAlt className="text-xl" /></a>}
								</div>
							</div>
							<p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 h-10 mb-6 leading-relaxed">{project.description}</p>
							<div className="flex flex-wrap gap-2">
								{project.techs?.map((tech) => (
									<span key={tech} className="px-4 py-1.5 bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 rounded-xl text-[9px] font-black uppercase tracking-widest border border-gray-100 dark:border-gray-800/50">
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
							className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md"
						/>
						<Motion.div
							initial={{ opacity: 0, scale: 0.9, y: 40 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 40 }}
							className="relative w-full max-w-2xl bg-white dark:bg-[#0a0f1c] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
						>
							<div className="p-10 md:p-14">
								<div className="flex items-center gap-6 mb-10">
									<div className="w-14 h-14 rounded-2xl bg-orange/10 flex items-center justify-center text-orange">
										<HiOutlinePlus className="text-2xl" />
									</div>
									<h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
										{editingProject ? "EDIT PROJECT" : "NEW PROJECT"}
									</h2>
								</div>
								
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Project Title</label>
											<input
												{...register("title", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
												placeholder="Enter project name"
											/>
										</div>
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Cover Image</label>
											<input
												type="file"
												{...register("cover")}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange/10 file:text-orange hover:file:bg-orange/20"
											/>
										</div>
									</div>

									<div className="space-y-3">
										<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Description</label>
										<textarea
											{...register("description", { required: true })}
											rows={4}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white resize-none"
											placeholder="Tell about the project..."
										/>
									</div>

									<div className="space-y-3">
										<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Tech Stack (comma separated)</label>
										<input
											{...register("techs", { required: true })}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
											placeholder="React, Tailwind, Node.js"
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">GitHub Repository</label>
											<div className="relative">
												<HiOutlineCodeBracket className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
												<input
													{...register("githubLink")}
													className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
													placeholder="https://github.com/..."
												/>
											</div>
										</div>
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Live Demo URL</label>
											<div className="relative">
												<HiOutlineGlobeAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
												<input
													{...register("liveLink")}
													className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
													placeholder="https://..."
												/>
											</div>
										</div>
									</div>

									<div className="flex justify-end gap-6 pt-6">
										<button
											type="button"
											onClick={closeModal}
											className="px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
										>
											DISCARD
										</button>
										<button
											disabled={isCreating || isUpdating}
											className="bg-orange text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
										>
											{editingProject ? "UPDATE PROJECT" : "PUBLISH PROJECT"}
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
