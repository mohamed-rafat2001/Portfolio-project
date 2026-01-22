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
		</div>
	);
};

export default Educations;
