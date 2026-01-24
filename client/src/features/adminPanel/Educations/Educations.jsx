import { useState, useEffect } from "react";
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
import Pagination from "../../../shared/components/ui/Pagination";

const Educations = () => {
	const [page, setPage] = useState(1);
	const limit = 6;
	const { educations, isLoading: isFetching, totalResults } = useEducations({ page, limit });
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

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20 auto-rows-fr">
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

            {educations?.length === 0 && (
				<div className="text-center py-24 bg-[#0b1120] rounded-[3rem] border border-white/5 shadow-2xl">
					<div className="w-24 h-24 bg-[#030712] rounded-[2rem] flex items-center justify-center text-gray-700 text-5xl mx-auto mb-10 border border-white/5">
						<HiOutlineAcademicCap />
					</div>
					<h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">
						No education records
					</h3>
					<p className="text-gray-500 mb-12">
						Start by adding your first academic qualification.
					</p>
                    <button 
                        onClick={handleAdd}
                        className="px-12 py-5 bg-orange text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-orange/20 shadow-2xl transition-all"
                    >
                        + Add Education
                    </button>
				</div>
			)}

			<Pagination 
				page={page} 
				totalResults={totalResults} 
				limit={limit} 
				setPage={setPage} 
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingEdu ? "Edit Education" : "Add Education"}
				maxWidth="max-w-xl"
			>
				<EducationForm
					education={editingEdu}
					onSubmit={handleSubmit}
					isLoading={isCreating || isUpdating}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default Educations;
