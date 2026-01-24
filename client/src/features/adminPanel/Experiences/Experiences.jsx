import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineBriefcase } from "react-icons/hi2";
import useExperiences from "./hooks/useExperiences";
import useCreateExp from "./hooks/useCreateExp";
import useUpdateExp from "./hooks/useUpdateExp";
import useDeleteExp from "./hooks/useDeleteExp";
import ExperienceCard from "./components/ExperienceCard";
import ExperienceForm from "./components/ExperienceForm";
import Modal from "../../../shared/components/ui/Modal";
import AdminHeader from "../../../shared/components/ui/AdminHeader";
import LoadingState from "../../../shared/components/ui/LoadingState";

const Experiences = () => {
	const { experiences, isLoading: isFetching } = useExperiences();
	const { mutate: createExp, isLoading: isCreating } = useCreateExp();
	const { mutate: updateExp, isLoading: isUpdating } = useUpdateExp();
	const { mutate: deleteExp } = useDeleteExp();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingExp, setEditingExp] = useState(null);

	const handleAdd = () => {
		setEditingExp(null);
		setIsModalOpen(true);
	};

	const handleEdit = (exp) => {
		setEditingExp(exp);
		setIsModalOpen(true);
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this experience entry?")) {
			deleteExp(id);
		}
	};

	const handleSubmit = (data) => {
		if (editingExp) {
			updateExp(
				{ id: editingExp._id, data },
				{
					onSuccess: () => setIsModalOpen(false),
				}
			);
		} else {
			createExp(data, {
				onSuccess: () => setIsModalOpen(false),
			});
		}
	};

	if (isFetching) return <LoadingState message="Loading professional history..." />;

	return (
		<div className="space-y-8">
<<<<<<< HEAD
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Experiences</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage your professional work history and career journey.</p>
				</div>
				<button
					onClick={() => openModal()}
					className="flex items-center justify-center gap-2 bg-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-orange/20 hover:scale-105 transition-all active:scale-95"
				>
					<HiOutlinePlus className="text-lg" />
					ADD EXPERIENCE
				</button>
			</div>

			<div className="space-y-6">
				{experiences && experiences.length > 0 ? (
					experiences.map((exp) => (
						<Motion.div
							layout
							key={exp._id}
							className="bg-white dark:bg-[#0a0f1c] p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-orange/30 hover:shadow-2xl hover:shadow-orange/5 transition-all duration-500"
						>
							<div className="flex items-start gap-8">
								<div className="w-20 h-20 bg-gray-50 dark:bg-[#030712] rounded-[1.5rem] flex items-center justify-center text-orange shadow-inner border border-gray-100 dark:border-gray-800 group-hover:bg-orange group-hover:text-white transition-all duration-500 shrink-0">
									<HiOutlineBuildingOffice className="text-3xl" />
								</div>
								<div>
									<h3 className="font-black text-2xl text-gray-900 dark:text-white uppercase tracking-tight mb-2">{exp.role}</h3>
									<div className="flex flex-wrap items-center gap-6 text-sm">
										<span className="font-black text-orange uppercase tracking-widest">{exp.company}</span>
										<span className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[11px]">
											<HiOutlineCalendar className="text-lg text-orange/50" />
											{exp.duration}
										</span>
									</div>
									<p className="mt-6 text-base text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed font-medium">{exp.description}</p>
								</div>
							</div>
							<div className="flex items-center gap-4 self-end md:self-center">
								<button
									onClick={() => openModal(exp)}
									className="p-5 bg-gray-50 dark:bg-[#030712] text-gray-400 hover:text-orange hover:bg-orange/10 border border-gray-100 dark:border-gray-800 rounded-2xl transition-all shadow-sm active:scale-95"
									title="Edit Experience"
								>
									<HiOutlinePencil className="text-xl" />
								</button>
								<button
									onClick={() => handleDelete(exp._id)}
									className="p-5 bg-gray-50 dark:bg-[#030712] text-gray-400 hover:text-red-500 hover:bg-red-500/10 border border-gray-100 dark:border-gray-800 rounded-2xl transition-all shadow-sm active:scale-95"
									title="Delete Experience"
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
							<HiOutlineBuildingOffice className="text-6xl" />
						</div>
						<div className="space-y-4">
							<h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">No History Yet</h3>
							<p className="text-gray-500 dark:text-gray-500 font-medium max-w-sm mx-auto text-lg">
								Your professional journey is empty. Start by adding your first career milestone.
							</p>
						</div>
						<button
							onClick={() => openModal()}
							className="flex items-center justify-center gap-3 bg-orange text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-orange/30 hover:scale-[1.05] active:scale-95 transition-all"
						>
							<HiOutlinePlus className="text-xl" />
							ADD EXPERIENCE
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
										<HiOutlineBuildingOffice className="text-2xl" />
									</div>
									<h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
										{editingExp ? "EDIT RECORD" : "NEW RECORD"}
									</h2>
								</div>
								
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Company Name</label>
											<input
												{...register("company", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
												placeholder="Where did you work?"
											/>
										</div>
										<div className="space-y-3">
											<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Your Role</label>
											<input
												{...register("role", { required: true })}
												className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
												placeholder="What was your title?"
											/>
										</div>
									</div>

									<div className="space-y-3">
										<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Time Period</label>
										<input
											{...register("duration", { required: true })}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white"
											placeholder="e.g. Jan 2022 - Present"
										/>
									</div>

									<div className="space-y-3">
										<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Job Description</label>
										<textarea
											{...register("description", { required: true })}
											rows={5}
											className="w-full px-6 py-4 bg-gray-50 dark:bg-[#030712] border-none rounded-2xl focus:ring-4 focus:ring-orange/5 transition-all text-sm font-medium dark:text-white resize-none"
											placeholder="Describe your impact and key responsibilities..."
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
											{editingExp ? "UPDATE HISTORY" : "SAVE HISTORY"}
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
				title="Work Experience"
				description="Manage your professional journey and achievements"
				icon={<HiOutlineBriefcase />}
				action={{
					label: "Add Experience",
					icon: <HiOutlinePlus />,
					onClick: handleAdd,
				}}
			/>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
				<AnimatePresence mode="popLayout">
					{experiences?.map((exp) => (
						<ExperienceCard
							key={exp._id}
							experience={exp}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</AnimatePresence>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingExp ? "Edit Experience" : "Add Experience"}
				maxWidth="max-w-2xl"
			>
				<ExperienceForm
					experience={editingExp}
					onSubmit={handleSubmit}
					isLoading={isCreating || isUpdating}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
		</div>
	);
};

export default Experiences;
