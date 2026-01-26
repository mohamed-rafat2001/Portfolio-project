import { useState, useEffect } from "react";
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
import Pagination from "../../../shared/components/ui/Pagination";

const Experiences = () => {
	const [page, setPage] = useState(1);
	const limit = 3;
	const { experiences, isLoading: isFetching, totalResults } = useExperiences({ page, limit });
	const { mutate: createExp, isLoading: isCreating } = useCreateExp();
	const { mutate: updateExp, isLoading: isUpdating } = useUpdateExp();
	const { mutate: deleteExp } = useDeleteExp();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingExp, setEditingExp] = useState(null);

	// Re-check page if results are zero (e.g. after delete)
	useEffect(() => {
		if (experiences && experiences.length === 0 && page > 1) setPage(page - 1);
	}, [experiences, page]);

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

			<div className="flex justify-end">
				<Pagination 
					page={page} 
					totalResults={totalResults} 
					limit={limit} 
					setPage={setPage} 
					size="small"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
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

            {experiences?.length === 0 && (
				<div className="text-center py-24 bg-white dark:bg-[#0b1120] rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl">
					<div className="w-24 h-24 bg-gray-50 dark:bg-[#030712] rounded-[2rem] flex items-center justify-center text-gray-400 dark:text-gray-700 text-5xl mx-auto mb-10 border border-gray-100 dark:border-white/5">
						<HiOutlineBriefcase />
					</div>
					<h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">
						No professional records
					</h3>
					<p className="text-gray-500 mb-12">
						Your career milestones and professional journey will be visualized here
					</p>
                    <button 
                        onClick={handleAdd}
                        className="px-12 py-5 bg-orange text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-orange/20 shadow-2xl transition-all"
                    >
                        + Add Experience
                    </button>
				</div>
			)}

			<Pagination 
				page={page} 
				totalResults={totalResults} 
				limit={limit} 
				setPage={setPage} 
                size="small"
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingExp ? "Edit Experience" : "Add Experience"}
				maxWidth="max-w-xl"
			>
				<ExperienceForm
					experience={editingExp}
					onSubmit={handleSubmit}
					isLoading={isCreating || isUpdating}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default Experiences;
