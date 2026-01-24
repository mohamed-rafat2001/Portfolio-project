import { useState } from "react";
import {  AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineAcademicCap } from "react-icons/hi2";
import useEducations from "./hooks/useEducations";
import useCreateEdu from "./hooks/useCreateEdu";
import useUpdateEdu from "./hooks/useUpdateEdu";
import useDeleteEdu from "./hooks/useDeleteEdu";
import EducationCard from "./components/EducationCard";
import EducationForm from "./components/EducationForm";
import Modal from "../../../shared/components/ui/Modal";
import AdminHeader from "../../../shared/components/ui/AdminHeader";
import LoadingState from "../../../shared/components/ui/LoadingState";

const Educations = () => {
	const { educations, isLoading: isFetching } = useEducations();
	const { mutate: createEdu, isLoading: isCreating } = useCreateEdu();
	const { mutate: updateEdu, isLoading: isUpdating } = useUpdateEdu();
	const { mutate: deleteEdu } = useDeleteEdu();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingEdu, setEditingEdu] = useState(null);

	const handleAdd = () => {
		setEditingEdu(null);
		setIsModalOpen(true);
	};

	const handleEdit = (edu) => {
		setEditingEdu(edu);
		setIsModalOpen(true);
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this education entry?")) {
			deleteEdu(id);
		}
	};

	const handleSubmit = (data) => {
		if (editingEdu) {
			updateEdu(
				{ id: editingEdu._id, data },
				{
					onSuccess: () => setIsModalOpen(false),
				}
			);
		} else {
			createEdu(data, {
				onSuccess: () => setIsModalOpen(false),
			});
		}
	};

	if (isFetching) return <LoadingState message="Loading education history..." />;

	return (
		<div className="space-y-8">
<<<<<<< HEAD
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Educations</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage your academic qualifications and certifications.</p>
				</div>
				<button
					onClick={() => openModal()}
					className="flex items-center justify-center gap-2 bg-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-orange/20 hover:scale-105 transition-all active:scale-95"
				>
					<HiOutlinePlus className="text-lg" />
					ADD EDUCATION
				</button>
			</div>

			<div className="space-y-6">
				{educations && educations.length > 0 ? (
					educations.map((edu) => (
						<Motion.div
							layout
							key={edu._id}
							className="bg-white dark:bg-[#0a0f1c] p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-orange/30 hover:shadow-2xl hover:shadow-orange/5 transition-all duration-500"
						>
							<div className="flex items-start gap-8">
								<div className="w-20 h-20 bg-gray-50 dark:bg-[#030712] rounded-[1.5rem] flex items-center justify-center text-orange shadow-inner border border-gray-100 dark:border-gray-800 group-hover:bg-orange group-hover:text-white transition-all duration-500 shrink-0">
									<HiOutlineAcademicCap className="text-3xl" />
								</div>
								<div>
									<h3 className="font-black text-2xl text-gray-900 dark:text-white uppercase tracking-tight mb-2">{edu.degree}</h3>
									<div className="flex flex-wrap items-center gap-6 text-sm">
										<span className="font-black text-orange uppercase tracking-widest">{edu.institution}</span>
										<span className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[11px]">
											<HiOutlineCalendar className="text-lg text-orange/50" />
											{edu.duration}
										</span>
									</div>
									{edu.description && (
										<p className="mt-6 text-base text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed font-medium">{edu.description}</p>
									)}
								</div>
							</div>
							<div className="flex items-center gap-4 self-end md:self-center">
								<button
									onClick={() => openModal(edu)}
									className="p-5 bg-gray-50 dark:bg-[#030712] text-gray-400 hover:text-orange hover:bg-orange/10 border border-gray-100 dark:border-gray-800 rounded-2xl transition-all shadow-sm active:scale-95"
									title="Edit Education"
								>
									<HiOutlinePencil className="text-xl" />
								</button>
								<button
									onClick={() => handleDelete(edu._id)}
									className="p-5 bg-gray-50 dark:bg-[#030712] text-gray-400 hover:text-red-500 hover:bg-red-500/10 border border-gray-100 dark:border-gray-800 rounded-2xl transition-all shadow-sm active:scale-95"
									title="Delete Education"
								>
									<HiOutlineTrash className="text-xl" />
								</button>
							</div>
						</Motion.div>
					))
				) : (
					<Motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-white dark:bg-[#0a0f1c] rounded-[3rem] p-24 border border-gray-100 dark:border-gray-800/50 flex flex-col items-center text-center space-y-10 shadow-sm"
					>
						<div className="w-32 h-32 bg-gray-50 dark:bg-[#030712] rounded-[2.5rem] flex items-center justify-center text-gray-200 dark:text-gray-800 shadow-inner border border-gray-100 dark:border-gray-800">
							<HiOutlineAcademicCap className="text-6xl" />
						</div>
						<div className="space-y-4">
							<h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">No Academic Records</h3>
							<p className="text-gray-500 dark:text-gray-500 font-medium max-w-sm mx-auto text-lg">
								Your educational background is empty. Start by adding your first qualification.
							</p>
						</div>
						<button
							onClick={() => openModal()}
							className="flex items-center justify-center gap-3 bg-orange text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-orange/30 hover:scale-[1.05] active:scale-95 transition-all"
						>
							<HiOutlinePlus className="text-xl" />
							ADD EDUCATION
						</button>
					</Motion.div>
				)}
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
										<HiOutlineAcademicCap className="text-2xl" />
									</div>
									<h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
										{editingEdu ? "EDIT QUALIFICATION" : "NEW QUALIFICATION"}
									</h2>
								</div>
								
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Institution</label>
											<input
												{...register("institution", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
												placeholder="University or School"
											/>
										</div>
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Degree/Field</label>
											<input
												{...register("degree", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
												placeholder="e.g. Computer Science"
											/>
										</div>
									</div>

									<div className="space-y-3">
										<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Duration</label>
										<input
											{...register("duration", { required: true })}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
											placeholder="e.g. 2018 - 2022"
										/>
									</div>

									<div className="space-y-3">
										<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Additional Info (Optional)</label>
										<textarea
											{...register("description")}
											rows={4}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white resize-none"
											placeholder="Honors, GPA, or relevant achievements..."
										/>
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
											{editingEdu ? "UPDATE RECORD" : "SAVE RECORD"}
										</button>
									</div>
								</form>
							</div>
						</Motion.div>
					</div>
				)}
			</AnimatePresence>
=======
			<AdminHeader
				title="Education"
				description="Manage your academic background and certifications"
				icon={<HiOutlineAcademicCap />}
				action={{
					label: "Add Education",
					icon: <HiOutlinePlus />,
					onClick: handleAdd,
				}}
			/>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
				<AnimatePresence mode="popLayout">
					{educations?.map((edu) => (
						<EducationCard
							key={edu._id}
							education={edu}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</AnimatePresence>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingEdu ? "Edit Education" : "Add Education"}
				maxWidth="max-w-2xl"
			>
				<EducationForm
					education={editingEdu}
					onSubmit={handleSubmit}
					isLoading={isCreating || isUpdating}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
		</div>
	);
};

export default Educations;
