import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineWrench } from "react-icons/hi2";
import useSkills from "../../../hooks/useSkills";
import useCreateSkill from "./hooks/useCreateSkill";
import useUpdateSkill from "./hooks/useUpdateSkill";
import useDeleteSkill from "./hooks/useDeleteSkill";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Skills = () => {
	const { skills, isLoading } = useSkills();
	const { createSkill, isLoading: isCreating } = useCreateSkill();
	const { updateSkill, isLoading: isUpdating } = useUpdateSkill();
	const { deleteSkill, isLoading: isDeleting } = useDeleteSkill();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingSkill, setEditingSkill] = useState(null);

	const { register, handleSubmit, reset, setValue } = useForm();

	const onSubmit = (data) => {
		if (editingSkill) {
			updateSkill({ id: editingSkill._id, data });
		} else {
			createSkill(data);
		}
		closeModal();
	};

	const openModal = (skill = null) => {
		if (skill) {
			setEditingSkill(skill);
			setValue("name", skill.name);
			setValue("category", skill.category);
		} else {
			setEditingSkill(null);
			reset();
		}
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingSkill(null);
		reset();
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this skill?")) {
			deleteSkill(id);
		}
	};

	if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin"></div></div>;

	// Group skills by category
	const categories = skills ? [...new Set(skills.map(s => s.category))] : [];

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Skills</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-2">Manage your technical expertise and tools.</p>
				</div>
				<button
					onClick={() => openModal()}
					className="flex items-center justify-center gap-2 bg-orange text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange/20 hover:scale-105 transition-all"
				>
					<HiOutlinePlus className="text-lg" />
					Add Skill
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{categories.map(category => (
					<div key={category} className="space-y-4">
						<h2 className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">{category}</h2>
						<div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-3">
							{skills.filter(s => s.category === category).map(skill => (
								<div key={skill._id} className="flex items-center justify-between group">
									<span className="text-sm font-bold text-gray-700 dark:text-gray-300">{skill.name}</span>
									<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
										<button
											onClick={() => openModal(skill)}
											className="p-2 text-gray-400 hover:text-orange transition-colors"
										>
											<HiOutlinePencil className="text-sm" />
										</button>
										<button
											onClick={() => handleDelete(skill._id)}
											className="p-2 text-gray-400 hover:text-red-500 transition-colors"
										>
											<HiOutlineTrash className="text-sm" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
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
							className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-4xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
						>
							<div className="p-8">
								<h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white mb-6">
									{editingSkill ? "Edit Skill" : "Add Skill"}
								</h2>
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
									<div className="space-y-2">
										<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Skill Name</label>
										<input
											{...register("name", { required: true })}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
											placeholder="e.g. React, Node.js"
										/>
									</div>

									<div className="space-y-2">
										<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Category</label>
										<input
											{...register("category", { required: true })}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
											placeholder="e.g. Frontend, Backend, Tools"
										/>
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
											{editingSkill ? "Save Changes" : "Create Skill"}
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

export default Skills;
