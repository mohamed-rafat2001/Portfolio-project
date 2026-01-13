import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineCalendar, HiOutlineBuildingOffice } from "react-icons/hi2";
import useExperiences from "../../../hooks/useExperiences";
import useCreateExp from "./hooks/useCreateExp";
import useUpdateExp from "./hooks/useUpdateExp";
import useDeleteExp from "./hooks/useDeleteExp";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Experiences = () => {
	const { experiences, isLoading } = useExperiences();
	const { createExp, isLoading: isCreating } = useCreateExp();
	const { updateExp, isLoading: isUpdating } = useUpdateExp();
	const { deleteExp, isLoading: isDeleting } = useDeleteExp();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingExp, setEditingExp] = useState(null);

	const { register, handleSubmit, reset, setValue } = useForm();

	const onSubmit = (data) => {
		if (editingExp) {
			updateExp({ id: editingExp._id, data });
		} else {
			createExp(data);
		}
		closeModal();
	};

	const openModal = (exp = null) => {
		if (exp) {
			setEditingExp(exp);
			setValue("company", exp.company);
			setValue("role", exp.role);
			setValue("duration", exp.duration);
			setValue("description", exp.description);
		} else {
			setEditingExp(null);
			reset();
		}
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingExp(null);
		reset();
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this experience?")) {
			deleteExp(id);
		}
	};

	if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin"></div></div>;

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Experiences</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-2">Manage your professional work history.</p>
				</div>
				<button
					onClick={() => openModal()}
					className="flex items-center justify-center gap-2 bg-orange text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange/20 hover:scale-105 transition-all"
				>
					<HiOutlinePlus className="text-lg" />
					Add Experience
				</button>
			</div>

			<div className="space-y-4">
				{experiences?.map((exp) => (
					<Motion.div
						layout
						key={exp._id}
						className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
					>
						<div className="flex items-start gap-4">
							<div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl text-orange">
								<HiOutlineBuildingOffice className="text-2xl" />
							</div>
							<div>
								<h3 className="font-black text-lg text-gray-900 dark:text-white uppercase">{exp.role}</h3>
								<div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
									<span className="font-bold text-orange">{exp.company}</span>
									<span className="flex items-center gap-1">
										<HiOutlineCalendar />
										{exp.duration}
									</span>
								</div>
								<p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-2xl">{exp.description}</p>
							</div>
						</div>
						<div className="flex items-center gap-2 self-end md:self-center">
							<button
								onClick={() => openModal(exp)}
								className="p-3 bg-gray-50 dark:bg-gray-950 text-gray-400 hover:text-orange hover:bg-orange/10 rounded-xl transition-all"
							>
								<HiOutlinePencil />
							</button>
							<button
								onClick={() => handleDelete(exp._id)}
								className="p-3 bg-gray-50 dark:bg-gray-950 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
							>
								<HiOutlineTrash />
							</button>
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
									{editingExp ? "Edit Experience" : "Add Experience"}
								</h2>
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Company</label>
											<input
												{...register("company", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
												placeholder="Company name"
											/>
										</div>
										<div className="space-y-2">
											<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Role</label>
											<input
												{...register("role", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
												placeholder="Job title"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Duration</label>
										<input
											{...register("duration", { required: true })}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
											placeholder="e.g. Jan 2022 - Present"
										/>
									</div>

									<div className="space-y-2">
										<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Description</label>
										<textarea
											{...register("description", { required: true })}
											rows={4}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm resize-none"
											placeholder="Key responsibilities and achievements"
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
											{editingExp ? "Save Changes" : "Create Experience"}
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

export default Experiences;
