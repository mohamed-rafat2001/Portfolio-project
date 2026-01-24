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
		</div>
	);
};

export default Experiences;
