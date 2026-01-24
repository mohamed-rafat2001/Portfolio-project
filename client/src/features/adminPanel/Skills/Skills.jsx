import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineSparkles } from "react-icons/hi2";
import useSkills from "./hooks/useSkills";
import useCreateSkill from "./hooks/useCreateSkill";
import useUpdateSkill from "./hooks/useUpdateSkill";
import useDeleteSkill from "./hooks/useDeleteSkill";
import SkillCard from "./components/SkillCard";
import SkillForm from "./components/SkillForm";
import Modal from "../../../shared/components/ui/Modal";
import AdminHeader from "../../../shared/components/ui/AdminHeader";
import LoadingState from "../../../shared/components/ui/LoadingState";
import Pagination from "../../../shared/components/ui/Pagination";

const Skills = () => {
	const [page, setPage] = useState(1);
	const limit = 8;
	const { skills, isLoading: isFetching, totalResults } = useSkills({ page, limit });
	const { mutate: createSkill, isLoading: isCreating } = useCreateSkill();
	const { mutate: updateSkill, isLoading: isUpdating } = useUpdateSkill();
	const { mutate: deleteSkill } = useDeleteSkill();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingSkill, setEditingSkill] = useState(null);

	const handleAdd = () => {
		setEditingSkill(null);
		setIsModalOpen(true);
	};

	const handleEdit = (skill) => {
		setEditingSkill(skill);
		setIsModalOpen(true);
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this skill?")) {
			deleteSkill(id);
		}
	};

	const handleSubmit = (data) => {
		if (editingSkill) {
			updateSkill(
				{ id: editingSkill._id, data },
				{
					onSuccess: () => setIsModalOpen(false),
				}
			);
		} else {
			createSkill(data, {
				onSuccess: () => setIsModalOpen(false),
			});
		}
	};

	if (isFetching) return <LoadingState message="Loading skills..." />;

	return (
		<div className="space-y-8">
			<AdminHeader
				title="Skills & Expertise"
				description="Manage your technical skills and proficiency levels"
				icon={<HiOutlineSparkles />}
				action={{
					label: "Add Skill",
					icon: <HiOutlinePlus />,
					onClick: handleAdd,
				}}
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				<AnimatePresence mode="popLayout">
					{skills?.map((skill) => (
						<SkillCard
							key={skill._id}
							skill={skill}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</AnimatePresence>
			</div>

			<Pagination 
				page={page} 
				totalResults={totalResults} 
				limit={limit} 
				setPage={setPage} 
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingSkill ? "Edit Skill" : "Add New Skill"}
			>
				<SkillForm
					skill={editingSkill}
					onSubmit={handleSubmit}
					isLoading={isCreating || isUpdating}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default Skills;
