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
		const skillsArray = data.skills.split(",").map(s => s.trim()).filter(s => s !== "");
		const skillData = {
			name: data.name,
			skills: skillsArray
		};

		if (editingSkill) {
			updateSkill({ id: editingSkill._id, data: skillData });
		} else {
			createSkill(skillData);
		}
		closeModal();
	};

	const openModal = (skill = null) => {
		if (skill) {
			setEditingSkill(skill);
			setValue("name", skill.name);
			setValue("skills", skill.skills.join(", "));
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

	return (
		<div className="space-y-12">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Skills</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage your technical expertise and tools.</p>
				</div>
				<button
					onClick={() => openModal()}
					className="flex items-center justify-center gap-2 bg-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-orange/20 hover:scale-105 transition-all active:scale-95"
				>
					<HiOutlinePlus className="text-lg" />
					ADD SKILL
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
				{skills?.map(skillGroup => (
					<div key={skillGroup._id} className="space-y-6">
						<div className="flex items-center justify-between px-2">
								<div className="flex items-center gap-3">
									<div className="w-1.5 h-6 bg-orange rounded-full" />
									<h2 className="font-black uppercase tracking-[0.2em] text-[11px] text-gray-400">{skillGroup.name.toUpperCase()}</h2>
								</div>
							<div className="flex items-center gap-2">
								<button 
									onClick={() => openModal(skillGroup)}
									className="p-2 text-gray-500 hover:text-orange transition-colors"
								>
									<HiOutlinePencil className="text-sm" />
								</button>
								<button 
									onClick={() => handleDelete(skillGroup._id)}
									className="p-2 text-gray-500 hover:text-red-500 transition-colors"
								>
									<HiOutlineTrash className="text-sm" />
								</button>
							</div>
						</div>
						
						<div className="bg-white dark:bg-[#0a0f1c] p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800/50 min-h-[180px] flex flex-wrap gap-3 content-start shadow-sm hover:border-orange/30 transition-all duration-500">
							{skillGroup.skills?.map((skill, index) => (
								<Motion.div
									layout
									key={index}
									className="group/item relative px-5 py-2.5 bg-gray-50 dark:bg-[#030712] border border-gray-100 dark:border-gray-800/50 rounded-2xl flex items-center gap-3 hover:border-orange/30 transition-all cursor-default"
								>
									<span className="text-xs font-bold text-gray-600 dark:text-gray-300 tracking-wide">{skill}</span>
								</Motion.div>
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
							className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md"
						/>
						<Motion.div
							initial={{ opacity: 0, scale: 0.9, y: 40 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 40 }}
							className="relative w-full max-w-2xl bg-white dark:bg-[#0a0f1c] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
						>
							<div className="p-10 md:p-14">
								<div className="flex items-center gap-6 mb-12">
									<div className="w-14 h-14 rounded-2xl bg-orange/10 flex items-center justify-center text-orange">
										<HiOutlineWrench className="text-2xl" />
									</div>
									<h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
										{editingSkill ? "EDIT SKILL" : "NEW SKILL"}
									</h2>
								</div>
								
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Category Name</label>
											<input
												{...register("name", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
												placeholder="e.g. Frontend"
											/>
										</div>
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Skills (comma separated)</label>
											<input
												{...register("skills", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
												placeholder="React, Vue, Next.js"
											/>
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
											{editingSkill ? "UPDATE SKILL" : "SAVE SKILL"}
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
